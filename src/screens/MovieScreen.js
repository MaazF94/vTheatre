import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import VideoPlayer from "../components/movie/VideoPlayer";

const MovieScreen = (props) => {

  const showtime = props.route.params.showtime.showtime;
  const movie = props.route.params.movie;
  const selectedDate = props.route.params.selectedDate;

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
