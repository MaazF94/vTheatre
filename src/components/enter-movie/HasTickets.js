import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Api from "../../api/Api";
import UriConstants from "../../api/UriConstants";
import AlertMessages from "../common/AlertMessages";
import HttpHeaders from "../common/HttpHeaders";
import ScreenTitles from "../common/ScreenTitles";
import * as Network from "expo-network";
import moment from "moment";

const HasTickets = ({
  setHasTickets,
  movie,
  selectedShowtimeObj,
  selectedDate,
  username,
}) => {
  const navigation = useNavigation();

  const showtimeHasNotEnded = (showtime) => {
    if (
      moment(selectedDate).format("MM/DD/YYYY") ===
      moment(new Date()).format("MM/DD/YYYY")
    ) {
      const hrs = movie.length.includes("HR") ? movie.length.substr(0, 1) : 0;
      const mins = movie.length.includes("MIN")
        ? movie.length.substring(
            movie.length.indexOf("MIN") - 3,
            movie.length.indexOf("MIN")
          )
        : 0;
      const secs = movie.length.includes("SEC")
        ? movie.length.substring(
            movie.length.indexOf("SEC") - 3,
            movie.length.indexOf("SEC")
          )
        : 0;

      const movieShowtime = moment(showtime, "HH:mm a");
      const currentTime = moment(new Date());

      if (
        currentTime >
        movieShowtime
          .add(parseInt(hrs), "hours")
          .add(parseInt(mins), "minutes")
          .add(parseInt(secs), "seconds")
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const checkMissedShowtime = (showtimeObj) => {
    if (!showtimeHasNotEnded(showtimeObj.showtime)) {
      return false;
    } else {
      return true;
    }
  };

  const verifyTicket = async () => {
    if (!checkMissedShowtime(selectedShowtimeObj)) {
      Alert.alert(
        AlertMessages.ShowtimeTooLateTitle,
        AlertMessages.ShowtimeTooLateMsg
      );
      return;
    }

    const networkStatus = await Network.getNetworkStateAsync();
    if (!networkStatus.isConnected) {
      Alert.alert(
        AlertMessages.ConnectivityErrorTitle,
        AlertMessages.ConnectivityErrorMsg
      );
      return;
    }

    let verifyTicketResponse;
    const verifyTicketRequest = {
      username: username,
      chosenDate: moment(selectedDate).format("YYYY-MM-DD"),
      showtime: selectedShowtimeObj.showtime,
    };

    await Api.post(UriConstants.verifyTicket, verifyTicketRequest, {
      headers: HttpHeaders.headers,
    }).then((response) => {
      verifyTicketResponse = response.data;
    });

    if (verifyTicketResponse.exists) {
      if (verifyTicketResponse.status === "ACTIVE") {
        refreshMovieFiles().then((refreshedMovie) => {
          navigation.navigate(ScreenTitles.MovieScreen, {
            movie: refreshedMovie,
            showtime: selectedShowtimeObj,
            selectedDate: selectedDate.toString(),
            ticketPrice: refreshedMovie.ticketPrice,
            iosProductId: refreshedMovie.iosProductId,
            username: username,
          });
        });
      } else if (verifyTicketResponse.status === "INACTIVE") {
        Alert.alert(
          AlertMessages.TicketStatusInactiveTitle,
          AlertMessages.TicketStatusInactiveMsg
        );
        return;
      } else if (verifyTicketResponse.status === "REFUNDED") {
        Alert.alert(
          AlertMessages.TicketStatusRefundedTitle,
          AlertMessages.TicketStatusRefundedMsg
        );
        return;
      }
    } else {
      Alert.alert(
        AlertMessages.InvalidTicketTitle,
        AlertMessages.InvalidTicketMsg
      );
      return;
    }
  };

  const refreshMovieFiles = async () => {
    const movieFiles = await Api.post(UriConstants.refreshMovieFiles, movie, {
      headers: HttpHeaders.headers,
    });
    return movieFiles.data;
  };

  return (
    <View style={styles.confirmationContainer}>
      <Text style={styles.text}>Enjoy the showing!</Text>
      <TouchableOpacity onPress={verifyTicket} style={styles.button}>
        <Text style={styles.buttonText}>Enter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setHasTickets(false)}>
        <Text style={styles.ticketText}>No ticket? Purchase one.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  confirmationContainer: {
    flexDirection: "column",
    backgroundColor: "#272727",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    paddingTop: 20,
    paddingBottom: 20,
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  textInput: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    height: 45,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#7E0808",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    width: 105,
    height: 35,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  ticketText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: "underline",
  },
});

export default HasTickets;
