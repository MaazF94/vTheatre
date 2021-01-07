import React, { useState } from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BannerBackground from "../components/common/BannerBackground";
import MovieDetails from "../components/home/MovieDetails";
import moment from "moment";

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(moment(new Date()));

  return (
      <View>
        <StatusBar backgroundColor="#343434" />
        <View>
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
