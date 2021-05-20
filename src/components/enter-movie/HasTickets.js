import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Api from "../../api/Api";
import UriConstants from "../../api/UriConstants";
import AlertMessages from "../common/AlertMessages";
import HttpHeaders from "../common/HttpHeaders";
import ScreenTitles from "../common/ScreenTitles";
import moment from "moment";
import LoadingSpinner from "../common/LoadingSpinner";

const HasTickets = ({
  movie,
  selectedShowtimeObj,
  selectedDate,
  username,
  verifyTicketResponse,
}) => {
  const navigation = useNavigation();
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

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

  const verifyEnterTheatre = async () => {
    if (!showtimeHasNotEnded(selectedShowtimeObj.showtime)) {
      Alert.alert(
        AlertMessages.ShowtimeTooLateTitle,
        AlertMessages.ShowtimeTooLateMsg
      );
      return;
    }

    if (verifyTicketResponse.exists) {
      if (verifyTicketResponse.status === "ACTIVE") {
        setShowLoadingSpinner(true);
        // Assume the ticket is valid
        let validTicket = true;
        // Validate Receipt for iOS to check if ticket was refunded
        if (verifyTicketResponse.appleTransactionId !== null) {
          const verifyReceiptRequest = {
            transactionReceipt: verifyTicketResponse.appleTransactionReceipt,
            transactionId: verifyTicketResponse.appleTransactionId,
          };
          await Api.post(UriConstants.validateReceipt, verifyReceiptRequest, {
            headers: HttpHeaders.headers,
          })
            .then((response) => {
              validTicket = response.data;
            })
            .catch(() => {
              Alert.alert(AlertMessages.ErrorTitle, AlertMessages.ErrorMsg);
              setShowLoadingSpinner(false);
            });
        }
        if (validTicket === true) {
          refreshMovieFiles()
            .then((refreshedMovie) => {
              const tokenLicenseRequest = {
                sourceType: Platform.OS,
              };
              if (refreshedMovie.drmEnabled) {
                // get license token
                Api.post(
                  UriConstants.getTokenLicense,
                  tokenLicenseRequest,
                  HttpHeaders.headers
                )
                  .then((licenseToken) => {
                    setShowLoadingSpinner(false);
                    navigation.navigate(ScreenTitles.MovieScreen, {
                      movie: refreshedMovie,
                      showtime: selectedShowtimeObj,
                      selectedDate: selectedDate.toString(),
                      ticketPrice: refreshedMovie.ticketPrice,
                      iosProductId: refreshedMovie.iosProductId,
                      username: username,
                      licenseToken: licenseToken.data,
                    });
                  })
                  .catch(() => {
                    setShowLoadingSpinner(false);
                    Alert.alert(
                      AlertMessages.ErrorTitle,
                      AlertMessages.ErrorMsg
                    );
                  });
              } else {
                navigation.navigate(ScreenTitles.MovieScreen, {
                  movie: refreshedMovie,
                  showtime: selectedShowtimeObj,
                  selectedDate: selectedDate.toString(),
                  ticketPrice: refreshedMovie.ticketPrice,
                  iosProductId: refreshedMovie.iosProductId,
                  username: username,
                });
              }
            })
            .catch(() => {
              setShowLoadingSpinner(false);
            });
        } else {
          setShowLoadingSpinner(false);
          verifyTicketResponse.status = "REFUNDED";
          Alert.alert(
            AlertMessages.TicketStatusRefundedTitle,
            AlertMessages.TicketStatusRefundedMsg
          );
        }
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
      <LoadingSpinner show={showLoadingSpinner} />
      <Text style={styles.title}>Enjoy The Showing!</Text>
      <View style={styles.ticketContainer}>
        <Text style={styles.textTicketTitle}>Ticket Confirmed:</Text>
        <Text style={styles.ticketText}>{username}</Text>
        <Text style={styles.ticketText}>
          {moment(selectedDate).format("dddd, MMMM DD, YYYY")}
        </Text>
        <Text style={styles.ticketText}>{selectedShowtimeObj.showtime}</Text>
      </View>
      <TouchableOpacity onPress={verifyEnterTheatre} style={styles.button}>
        <Text style={styles.buttonText}>Enter</Text>
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
  title: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  ticketContainer: {
    borderColor: "white",
    borderWidth: 1,
    marginTop: 20,
    padding: 20,
  },
  textTicketTitle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 5,
  },
  ticketText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
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
});

export default HasTickets;
