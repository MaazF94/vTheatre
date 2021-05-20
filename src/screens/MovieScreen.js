import React, { useEffect } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import VideoPlayer from "../components/movie/VideoPlayer";
import { useIsFocused } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";

const MovieScreen = (props) => {
  const showtime = props.route.params.showtime.showtime;
  const movie = props.route.params.movie;
  const selectedDateStr = props.route.params.selectedDate;
  const selectedDate = new Date(selectedDateStr);
  const ticketPrice = props.route.params.ticketPrice;
  const iosProductId = props.route.params.iosProductId;
  const username = props.route.params.username;
  const licenseToken = props.route.params.licenseToken;
  const isFocused = useIsFocused();

  useEffect(() => {
    const rotateLandscape = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };

    if (isFocused) {
      rotateLandscape();
    }
  }, [isFocused]);

  return (
    <View style={{ backgroundColor: "black" }}>
      <StatusBar type={"slide"} />
      <VideoPlayer
        showtime={showtime}
        movie={movie}
        selectedDate={selectedDate}
        ticketPrice={ticketPrice}
        iosProductId={iosProductId}
        username={username}
        licenseToken={licenseToken}
      />
    </View>
  );
};

export default MovieScreen;
