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
    <View>
      <StatusBar type={"slide"} />
      <VideoPlayer
        showtime={showtime}
        movie={movie}
        selectedDate={selectedDate}
      />
    </View>
  );
};

export default MovieScreen;
