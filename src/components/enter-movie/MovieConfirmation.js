import React, { useState, useEffect } from "react";
import { View, Platform } from "react-native";
import FreeShowing from "./FreeShowing";
import HasTickets from "./HasTickets";
import PurchaseTicket from "./PurchaseTicket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageConstants from "../common/StorageConstants";
import Api from "../../api/Api";
import HttpHeaders from "../common/HttpHeaders";
import * as Network from "expo-network";
import moment from "moment";
import UriConstants from "../../api/UriConstants";

const MovieConfirmation = ({
  movie,
  selectedShowtimeObj,
  selectedDate,
  iapProduct,
  username,
}) => {
  const [hasTickets, setHasTickets] = useState(false);
  const [verifyTicketResponse, setVerifyTicketResponse] = useState();
  const { ticketPrice, iosProductId } = movie;

  useEffect(() => {
    verifyTicket();
  }, [hasTickets]);

  const verifyTicket = async () => {
    const networkStatus = await Network.getNetworkStateAsync();
    if (!networkStatus.isConnected) {
      Alert.alert(
        AlertMessages.ConnectivityErrorTitle,
        AlertMessages.ConnectivityErrorMsg
      );
      return;
    }

    const username = await AsyncStorage.getItem(StorageConstants.Username);

    if (username === StorageConstants.Guest) {
      setHasTickets(false);
      return;
    }

    const verifyTicketRequest = {
      username: username,
      chosenDate: moment(selectedDate).format("YYYY-MM-DD"),
      showtime: selectedShowtimeObj.showtime,
    };

    await Api.post(UriConstants.verifyTicket, verifyTicketRequest, {
      headers: HttpHeaders.headers,
    }).then((response) => {
      setVerifyTicketResponse(response.data);
      if (response.data.exists) {
        setHasTickets(true);
      } else {
        setHasTickets(false);
      }
    });
  };

  const GetMovieConfirmationContent = () => {
    // check ticketPrice for Android, iosProductId for iOS
    if (
      (Platform.OS === "android" && ticketPrice === 0) ||
      (Platform.OS === "ios" && iosProductId === null)
    ) {
      return (
        <FreeShowing
          movie={movie}
          selectedShowtimeObj={selectedShowtimeObj}
          selectedDate={selectedDate}
          username={username}
        />
      );
    } else if (hasTickets) {
      return (
        <HasTickets
          movie={movie}
          selectedShowtimeObj={selectedShowtimeObj}
          setHasTickets={setHasTickets}
          selectedDate={selectedDate}
          username={username}
          verifyTicketResponse={verifyTicketResponse}
        />
      );
    } else {
      return (
        <View>
          <PurchaseTicket
            movie={movie}
            selectedShowtimeObj={selectedShowtimeObj}
            setHasTickets={setHasTickets}
            selectedDate={selectedDate}
            iapProduct={iapProduct}
            username={username}
          />
        </View>
      );
    }
  };

  return <GetMovieConfirmationContent />;
};

export default MovieConfirmation;
