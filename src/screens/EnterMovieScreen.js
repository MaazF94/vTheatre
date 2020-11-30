import React from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BannerBackground from "../components/common/BannerBackground";
import EnterTheatre from "../components/enter-movie/EnterTheatre";
import MovieConfirmation from "../components/enter-movie/MovieConfirmation";

const EnterMovieScreen = (props) => {
  const movie = props.route.params.movie;
  const showtime = props.route.params.showtime;
  // wait until img populates from URI, then pass img as prop to EnterTheatre
  //const img = movie.img;

  return (
    <View>
      <ScrollView>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={50}>
          <BannerBackground isTimeBanner={true} showtime={showtime} />
          {/* passing movie below until img comes from URI */}
          <EnterTheatre movie={movie} />
          <MovieConfirmation showtime={showtime} movie={movie} />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default EnterMovieScreen;
