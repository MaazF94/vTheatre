import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  View,
  Alert,
  KeyboardAvoidingView,
  BackHandler,
} from "react-native";
import EnterTheatre from "../components/enter-movie/EnterTheatre";
import { useNavigation } from "@react-navigation/native";
import AlertMessages from "../components/common/AlertMessages";
import { useIsFocused } from "@react-navigation/native";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EntervTheatreApp from "../components/auth/EntervTheatreApp";

const AuthScreen = () => {
  const navigation = useNavigation();
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      disableBackBtn();
    }
  }, [isFocused]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert(AlertMessages.ExitvTheatreTitle, "", [
        {
          text: AlertMessages.ExitvTheatreYesMsg,
          onPress: () => BackHandler.exitApp(),
        },
        {
          text: AlertMessages.ExitvTheatreNoMsg,
          onPress: () => null,
          style: "cancel",
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const disableBackBtn = () => {
    navigation.setOptions({
      headerLeft: null,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#343434" />
      <View style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={50}>
            <EnterTheatre img="https://d2jd6aahs7xcv2.cloudfront.net/Icon.jpg" />
            <LoadingSpinner show={showLoadingSpinner} />
            <EntervTheatreApp setShowLoadingSpinner={setShowLoadingSpinner} />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
};

export default AuthScreen;
