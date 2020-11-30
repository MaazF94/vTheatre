import React, { useState } from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BannerBackground from "../components/common/BannerBackground";
import MovieDetails from "../components/home/MovieDetails";

const HomeScreen = () => {
  const [currentDate, setDate] = useState(new Date());

  return (
    // <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#343434" />
        <View style={{ flex: 1 }}>
          <BannerBackground
            currentDate={currentDate}
            setDate={setDate}
            isDateBanner={true}
          />
          <MovieDetails currentDate={currentDate} />
        </View>
      </View>
    // </SafeAreaView>
  );
};

export default HomeScreen;
