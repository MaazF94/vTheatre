import React, { useEffect, useState } from "react";
import { Alert, Platform, ScrollView, View } from "react-native";
import BannerBackground from "../components/common/BannerBackground";
import EnterTheatre from "../components/enter-movie/EnterTheatre";
import MovieConfirmation from "../components/enter-movie/MovieConfirmation";
import * as ScreenOrientation from "expo-screen-orientation";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import UriConstants from "../api/UriConstants";
import Api from "../api/Api";
import HttpHeaders from "../components/common/HttpHeaders";
import * as Network from "expo-network";
import AlertMessages from "../components/common/AlertMessages";
import * as InAppPurchases from "expo-in-app-purchases";

const EnterMovieScreen = (props) => {
  const [movie, setMovie] = useState(props.route.params.movie);
  const selectedShowtimeObj = props.route.params.selectedShowtimeObj;
  const img = movie.img;
  const selectedDateStr = props.route.params.selectedDate;
  const selectedDate = new Date(selectedDateStr);
  const username = props.route.params.username;
  const isFocused = useIsFocused();
  const [iapProduct, setIapProduct] = useState();

  useEffect(() => {
    const rotatePortrait = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };

    if (isFocused) {
      refreshMovieFiles();
      rotatePortrait();
      if (Platform.OS === "ios" && movie.iosProductId !== null) {
        getProductsIAP();
      }
    }

    return () => {
      if (Platform.OS === "ios" && movie.iosProductId !== null && isFocused) {
        disconnectAppStore();
      }
    };
  }, [isFocused]);

  const disconnectAppStore = async () => {
    const networkStatus = await Network.getNetworkStateAsync();
    if (networkStatus.isConnected) {
      await InAppPurchases.disconnectAsync();
    }
  };

  const getProductsIAP = async () => {
    const networkStatus = await Network.getNetworkStateAsync();
    if (networkStatus.isConnected) {
      await InAppPurchases.connectAsync();
      const items = Platform.select({
        ios: [movie.iosProductId],
      });
      const { responseCode, results } = await InAppPurchases.getProductsAsync(
        items
      );
      if (responseCode === InAppPurchases.IAPResponseCode.OK) {
        setIapProduct(results);
      }
    }
  };

  const refreshMovieFiles = async () => {
    const networkStatus = await Network.getNetworkStateAsync();
    if (!networkStatus.isConnected) {
      Alert.alert(
        AlertMessages.ConnectivityErrorTitle,
        AlertMessages.ConnectivityErrorMsg
      );
      return;
    }
    // Error means signedUrl expired so create a new signedUrl
    axios
      .get(movie.img, {
        responseType: "arraybuffer",
      })
      .catch(async function (error) {
        if (error.response) {
          const movieFiles = await Api.post(
            UriConstants.refreshMovieFiles,
            movie,
            {
              headers: HttpHeaders.headers,
            }
          );
          setMovie(movieFiles.data);
        }
      });
  };

  return (
    <View>
      <ScrollView>
        <BannerBackground
          isTimeBanner={true}
          selectedShowtimeObj={selectedShowtimeObj}
        />
        <EnterTheatre img={img} />
        <MovieConfirmation
          selectedShowtimeObj={selectedShowtimeObj}
          movie={movie}
          selectedDate={selectedDate}
          iapProduct={iapProduct}
          username={username}
        />
      </ScrollView>
    </View>
  );
};

export default EnterMovieScreen;
