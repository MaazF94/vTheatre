import React, { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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

const EnterMovieScreen = (props) => {
  const [movie, setMovie] = useState(props.route.params.movie);
  const selectedShowtimeObj = props.route.params.selectedShowtimeObj;
  const img = movie.img;
  const selectedDateStr = props.route.params.selectedDate;
  const selectedDate = new Date(selectedDateStr);
  const isFocused = useIsFocused();

  useEffect(() => {
    const rotatePortrait = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };

    if (isFocused) {
      refreshMovieFiles();
      rotatePortrait();
    }
  }, [isFocused]);

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

  const CheckIfKeyboardViewNecessary = () => {
    if (movie.ticketPrice > 0) {
      return (
        <View>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={50}
            >
              <BannerBackground
                isTimeBanner={true}
                selectedShowtimeObj={selectedShowtimeObj}
              />
              <EnterTheatre img={img} />
              <MovieConfirmation
                selectedShowtimeObj={selectedShowtimeObj}
                movie={movie}
                selectedDate={selectedDate}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View>
          <BannerBackground
            isTimeBanner={true}
            selectedShowtimeObj={selectedShowtimeObj}
          />
          <EnterTheatre img={img} />
          <MovieConfirmation
            selectedShowtimeObj={selectedShowtimeObj}
            movie={movie}
            selectedDate={selectedDate}
          />
        </View>
      );
    }
  };

  return <CheckIfKeyboardViewNecessary />;
};

export default EnterMovieScreen;
