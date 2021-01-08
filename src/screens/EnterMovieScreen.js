import React from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BannerBackground from "../components/common/BannerBackground";
import EnterTheatre from "../components/enter-movie/EnterTheatre";
import MovieConfirmation from "../components/enter-movie/MovieConfirmation";

const EnterMovieScreen = (props) => {

  const movie = props.route.params.movie;
  const selectedShowtimeObj = props.route.params.selectedShowtimeObj;
  const img = movie.img;
  const selectedDate = JSON.parse(props.route.params.selectedDate);

  return (
    <View>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={50}>
          <BannerBackground isTimeBanner={true} selectedShowtimeObj={selectedShowtimeObj} />
          <EnterTheatre img={img} />
          <MovieConfirmation selectedShowtimeObj={selectedShowtimeObj} movie={movie} selectedDate={selectedDate} />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default EnterMovieScreen;
