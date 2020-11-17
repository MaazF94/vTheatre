import React from "react";
import { View } from "react-native";
import BannerBackground from "../components/common/BannerBackground";
import EnterTheatre from "../components/enter-movie/EnterTheatre";
import MovieConfirmation from "../components/enter-movie/MovieConfirmation";

const EnterMovieScreen = () => {
  return (
    <View>
      <BannerBackground isDateBanner={false} />
      <EnterTheatre/>
      <MovieConfirmation />
    </View>
  );
};

export default EnterMovieScreen;
