import React, { useState, useEffect } from "react";
import { StatusBar, View } from "react-native";
import BannerBackground from "../components/common/BannerBackground";
import MovieDetails from "../components/home/MovieDetails";
import { useIsFocused } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const isFocused = useIsFocused();

  useEffect(() => {
    const rotateLandscape = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };
    
    if (isFocused) {
      rotateLandscape();
    }
  }, [isFocused]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#343434" />
      <View style={{ flex: 1 }}>
        <BannerBackground
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          isDateBanner={true}
        />
        <MovieDetails selectedDate={selectedDate} />
      </View>
    </View>
  );
};

export default HomeScreen;
