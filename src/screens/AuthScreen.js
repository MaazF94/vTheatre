import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  BackHandler,
} from "react-native";
import EnterTheatre from "../components/enter-movie/EnterTheatre";
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import ScreenTitles from "../components/common/ScreenTitles";
import AlertMessages from "../components/common/AlertMessages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import AuthAlertMessages from "../components/common/AuthAlertMessages";
import AuthExceptions from "../components/common/AuthExceptions";
import StorageConstants from "../components/common/StorageConstants";
import LoadingSpinner from "../components/common/LoadingSpinner";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const navigation = useNavigation();
  const registerNavBtn = "Sign me up";
  const loginNavBtn = "Sign me in";
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

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(StorageConstants.Username, value);
    } catch (e) {
      // saving error
    }
  };

  const signUp = async () => {
    const emailValidation = checkValidEmailAddress();
    if (!emailValidation) {
      Alert.alert(
        AlertMessages.InvalidEmailAddressTitle,
        AlertMessages.InvalidEmailAddressMsg
      );
      return;
    }
    try {
      setShowLoadingSpinner(true);
      const { user } = await Auth.signUp({
        username: email,
        password,
      });
      storeData(user.attributes.email);
      setShowLoadingSpinner(false);
      navigation.navigate(ScreenTitles.HomeScreen);
    } catch (error) {
      setShowLoadingSpinner(false);
      if (error.name === AuthExceptions.AuthError) {
        Alert.alert(
          AuthAlertMessages.AuthErrorTitle,
          AuthAlertMessages.AuthErrorMsg
        );
      } else if (error.name === AuthExceptions.InvalidPasswordException) {
        Alert.alert(
          AuthAlertMessages.InvalidPasswordExceptionTitle,
          AuthAlertMessages.InvalidPasswordExceptionMsg
        );
      } else if (error.name === AuthExceptions.UsernameExistsException) {
        Alert.alert(
          AuthAlertMessages.UsernameExistsExceptionTitle,
          AuthAlertMessages.UsernameExistsExceptionMsg
        );
      } else {
        Alert.alert(AlertMessages.ErrorTitle, AlertMessages.ErrorMsg);
      }
    }
  };

  const signIn = async () => {
    try {
      setShowLoadingSpinner(true);
      const user = await Auth.signIn(email, password);
      storeData(user.attributes.email);
      setShowLoadingSpinner(false);
      navigation.navigate(ScreenTitles.HomeScreen);
    } catch (error) {
      setShowLoadingSpinner(false);
      if (error.name === AuthExceptions.NotAuthorizedException) {
        Alert.alert(
          AuthAlertMessages.NotAuthorizedExceptionTitle,
          AuthAlertMessages.NotAuthorizedExceptionMsg
        );
      } else if (
        error.name === AuthExceptions.AuthError ||
        error.name === AuthExceptions.InvalidParameterException
      ) {
        Alert.alert(
          AuthAlertMessages.InvalidParameterExceptionTitle,
          AuthAlertMessages.InvalidParameterExceptionMsg
        );
      } else {
        Alert.alert(AlertMessages.ErrorTitle, AlertMessages.ErrorMsg);
      }
    }
  };

  const enterAsGuest = () => {
    storeData(StorageConstants.Guest);
    navigation.navigate(ScreenTitles.HomeScreen);
  };

  const disableBackBtn = () => {
    navigation.setOptions({
      headerLeft: null,
    });
  };

  const checkValidEmailAddress = () => {
    let emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return emailRegex.test(email);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#343434" />
      <View style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={50}>
            <EnterTheatre img="https://d2jd6aahs7xcv2.cloudfront.net/Icon.jpg" />
            <LoadingSpinner show={showLoadingSpinner} />
            <View style={styles.confirmationContainer}>
              <Text style={styles.text}>Welcome!</Text>
              <TextInput
                style={styles.textInput}
                width="90%"
                backgroundColor="#ffffff"
                placeholderTextColor="#827D7D"
                placeholder="Email"
                onChangeText={(value) => setEmail(value)}
              />
              <TextInput
                style={styles.textInput}
                width="90%"
                backgroundColor="#ffffff"
                placeholderTextColor="#827D7D"
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(value) => setPassword(value)}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={signUp} style={styles.signMeUpBtn}>
                  <Text style={styles.buttonText}>{registerNavBtn}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={signIn} style={styles.signMeInBtn}>
                  <Text style={styles.buttonText}>{loginNavBtn}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={enterAsGuest}>
                <Text style={styles.ticketText}>Enter as guest</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  confirmationContainer: {
    flexDirection: "column",
    backgroundColor: "#272727",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    paddingTop: 20,
    paddingBottom: 20,
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    bottom: 0,
    marginTop: 20,
  },
  signMeUpBtn: {
    backgroundColor: "#7E0808",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width / 4,
    height: 35,
  },
  signMeInBtn: {
    backgroundColor: "#7E0808",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width / 4,
    height: 35,
    marginLeft: 10,
  },
  header: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  textInput: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
    height: 45,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#7E0808",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    width: 105,
    height: 35,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  ticketText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: "underline",
  },
});

export default AuthScreen;
