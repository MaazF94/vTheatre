import React, { useState, useEffect } from "react";
import { StatusBar, View } from "react-native";
import BannerBackground from "../components/common/BannerBackground";
import MovieDetails from "../components/home/MovieDetails";
import { useIsFocused } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import ScreenTitles from "../components/common/ScreenTitles";

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    const rotateLandscape = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };
    
    if (isFocused) {
      rotateLandscape();
      settingsIcon();
    }
  }, [isFocused]);

  navigateToSettings = () => {
    navigation.navigate(ScreenTitles.SettingsScreen);
  }

  const settingsIcon = () => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <AntDesign
            onPress={navigateToSettings}
            name="setting"
            size={24}
            color="white"
          />
        </View>
      ),
    });
  }

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
