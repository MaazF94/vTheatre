import React from "react";
import { StatusBar, View } from "react-native";
import BannerBackground from "../components/common/BannerBackground";
import MovieDetails from "../components/home/MovieDetails";

const HomeScreen = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#343434" />
      <View style={{flex: 1}}>
        <BannerBackground isDateBanner={true} />
        <MovieDetails />
      </View>
    </View>
  );
};

export default HomeScreen;
