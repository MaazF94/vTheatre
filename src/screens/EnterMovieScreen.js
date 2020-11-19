import React from "react";
import { Keyboard, KeyboardAvoidingView, View } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import BannerBackground from "../components/common/BannerBackground";
import EnterTheatre from "../components/enter-movie/EnterTheatre";
import MovieConfirmation from "../components/enter-movie/MovieConfirmation";

const EnterMovieScreen = () => {
  return (
    <View>
      <ScrollView>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={50}>
          {/* <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          > */}
            <BannerBackground isDateBanner={false} />
            <EnterTheatre />
            <MovieConfirmation />
          {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default EnterMovieScreen;
