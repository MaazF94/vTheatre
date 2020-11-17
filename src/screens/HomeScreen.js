import React from "react";
import { StatusBar, View } from "react-native";
import BannerBackground from "../components/common/BannerBackground";
import MovieDetails from "../components/home/MovieDetails";

const HomeScreen = () => {
  return (
    <View>
      <StatusBar backgroundColor="#343434" />
      <View>
        <BannerBackground isDateBanner={true} />
        <MovieDetails />
      </View>
    </View>
  );
};

export default HomeScreen;
