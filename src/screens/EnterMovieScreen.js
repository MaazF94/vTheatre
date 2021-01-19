import React, { useEffect } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BannerBackground from "../components/common/BannerBackground";
import EnterTheatre from "../components/enter-movie/EnterTheatre";
import MovieConfirmation from "../components/enter-movie/MovieConfirmation";
import * as ScreenOrientation from "expo-screen-orientation";
import { useIsFocused } from "@react-navigation/native";

const EnterMovieScreen = (props) => {
  const movie = props.route.params.movie;
  const selectedShowtimeObj = props.route.params.selectedShowtimeObj;
  const img = movie.img;
  const selectedDateStr = props.route.params.selectedDate;
  const selectedDate = new Date(selectedDateStr);
  const isFocused = useIsFocused();

  useEffect(() => {
    const rotatePortrait = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };

    if (isFocused) {
      rotatePortrait();
    }
  }, [isFocused]);

  return (
    <View>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={50}>
          <BannerBackground
            isTimeBanner={true}
            selectedShowtimeObj={selectedShowtimeObj}
          />
          <EnterTheatre img={img} />
          <MovieConfirmation
            selectedShowtimeObj={selectedShowtimeObj}
            movie={movie}
            selectedDate={selectedDate}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default EnterMovieScreen;
