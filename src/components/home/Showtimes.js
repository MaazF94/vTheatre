import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScreenTitles from "../common/ScreenTitles";
import moment from "moment";
import AlertMessages from "../common/AlertMessages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageConstants from "../common/StorageConstants";
import { useIsFocused } from "@react-navigation/native";
import * as Network from "expo-network";
import Api from "../../api/Api";
import UriConstants from "../../api/UriConstants";
import HttpHeaders from "../common/HttpHeaders";
import LoadingSpinner from "../common/LoadingSpinner";

const Showtimes = ({ movie, selectedDate }) => {
  const navigation = useNavigation();
  const { showtimes } = movie;
  const [username, setUsername] = useState("");
  const isFocused = useIsFocused();
  const [loadingAnimation, setLoadingAnimation] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  const verifyTicket = async (selectedShowtimeObj) => {
    const networkStatus = await Network.getNetworkStateAsync();
    if (!networkStatus.isConnected) {
      Alert.alert(
        AlertMessages.ConnectivityErrorTitle,
        AlertMessages.ConnectivityErrorMsg
      );
      return;
    }

    setLoadingAnimation(true);

    let verifyTicketResponse;
    const verifyTicketRequest = {
      username: username,
      chosenDate: moment(selectedDate).format("YYYY-MM-DD"),
      showtime: selectedShowtimeObj.showtime,
      movieId: movie.movieId,
    };

    await Api.post(UriConstants.verifyTicket, verifyTicketRequest, {
      headers: HttpHeaders.headers,
    }).then((response) => {
      setLoadingAnimation(false);
      verifyTicketResponse = response.data;

      if (verifyTicketResponse.exists) {
        navigation.navigate(ScreenTitles.EnterMovie, {
          movie: movie,
          selectedShowtimeObj: selectedShowtimeObj,
          selectedDate: selectedDate.toString(),
          username: username,
          verifyTicketResponse: verifyTicketResponse,
        });
      } else {
        navigation.navigate(ScreenTitles.PurchaseTicket, {
          movie: movie,
          selectedShowtimeObj: selectedShowtimeObj,
          selectedDate: selectedDate.toString(),
          username: username,
          verifyTicketResponse: verifyTicketResponse,
        });
      }
    });
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(StorageConstants.Username);
      setUsername(value);
    } catch (e) {
      // error reading value
    }
  };

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

  const checkMissedShowtime = (selectedShowtimeObj) => {
    if (!showtimeHasNotEnded(selectedShowtimeObj.showtime)) {
      Alert.alert(
        AlertMessages.ShowtimeTooLateTitle,
        AlertMessages.ShowtimeTooLateMsg
      );
      return;
    } else {
      if (
        (Platform.OS === "android" && movie.ticketPrice === 0) ||
        (Platform.OS === "ios" && movie.iosProductId === null)
      ) {
        navigation.navigate(ScreenTitles.EnterMovie, {
          movie: movie,
          selectedShowtimeObj: selectedShowtimeObj,
          selectedDate: selectedDate.toString(),
          username: username,
        });
      } else {
        verifyTicket(selectedShowtimeObj);
      }
    }
  };

  return (
    <View>
      <LoadingSpinner show={loadingAnimation} />
      <View style={styles.showtimesContainer}>
        {showtimes.map((showtimeObj) => {
          if (showtimeHasNotEnded(showtimeObj.showtime)) {
            return (
              <TouchableOpacity
                key={showtimeObj.showtimeId}
                onPress={() =>
                  checkMissedShowtime(showtimeObj, movie, selectedDate)
                }
                style={styles.button}
              >
                <Text key={showtimeObj.showtime} style={styles.buttonText}>
                  {showtimeObj.showtime}
                </Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  showtimesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginBottom: 10,
    backgroundColor: "#7E0808",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    width: 105,
    height: 35,
    marginLeft: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default Showtimes;
