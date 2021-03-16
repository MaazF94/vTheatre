import React, { useState, useEffect } from "react";
import { View, ScrollView, Platform } from "react-native";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EnterTheatre from "../components/enter-movie/EnterTheatre";
import BannerBackground from "../components/common/BannerBackground";
import PurchaseTicket from "../components/enter-movie/PurchaseTicket";
import * as InAppPurchases from "expo-in-app-purchases";
import { useIsFocused } from "@react-navigation/native";
import * as Network from "expo-network";

const PurchaseTicketScreen = (props) => {
  const movie = props.route.params.movie;
  const selectedShowtimeObj = props.route.params.selectedShowtimeObj;
  const selectedDateStr = props.route.params.selectedDate;
  const selectedDate = new Date(selectedDateStr);
  const username = props.route.params.username;
  const verifyTicketResponse = props.route.params.verifyTicketResponse;
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [iapProduct, setIapProduct] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
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

  return (
    <View>
      <ScrollView>
        <BannerBackground
          isTimeBanner={true}
          selectedShowtimeObj={selectedShowtimeObj}
        />
        <View>
          <EnterTheatre img={movie.img} />
          <LoadingSpinner show={loadingAnimation} />
          <PurchaseTicket
            movie={movie}
            selectedShowtimeObj={selectedShowtimeObj}
            selectedDate={selectedDate}
            username={username}
            verifyTicketResponse={verifyTicketResponse}
            setLoadingAnimation={setLoadingAnimation}
            iapProduct={iapProduct}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PurchaseTicketScreen;
