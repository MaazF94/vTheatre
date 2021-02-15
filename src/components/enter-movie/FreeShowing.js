import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AlertMessages from "../common/AlertMessages";
import ScreenTitles from "../common/ScreenTitles";
import * as Network from "expo-network";
import moment from "moment";
import Api from "../../api/Api";
import HttpHeaders from "../common/HttpHeaders";
import UriConstants from "../../api/UriConstants";

const FreeShowing = ({ movie, selectedShowtimeObj, selectedDate }) => {
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

      const movieEndTime = moment(showtime, "HH:mm a");
      const currentTime = moment(new Date());

      if (
        currentTime >
        movieEndTime
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

  const checkMissedShowtime = async () => {
    if (!showtimeHasNotEnded(selectedShowtimeObj.showtime)) {
      Alert.alert(
        AlertMessages.ShowtimeTooLateTitle,
        AlertMessages.ShowtimeTooLateMsg
      );
      return;
    } else {
      const networkStatus = await Network.getNetworkStateAsync();
      if (!networkStatus.isConnected) {
        Alert.alert(
          AlertMessages.ConnectivityErrorTitle,
          AlertMessages.ConnectivityErrorMsg
        );
        return;
      }
      refreshMovieFiles().then((refreshedMovie) => {
        navigation.navigate(ScreenTitles.MovieScreen, {
          movie: refreshedMovie,
          showtime: selectedShowtimeObj,
          selectedDate: selectedDate.toString(),
        });
      });
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
      <TouchableOpacity onPress={checkMissedShowtime} style={styles.button}>
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
    paddingBottom: 10,
    paddingTop: 10,
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
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

export default FreeShowing;
