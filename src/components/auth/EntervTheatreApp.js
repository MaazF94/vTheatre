import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import ScreenTitles from "../common/ScreenTitles";
import AlertMessages from "../common/AlertMessages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthAlertMessages from "../common/AuthAlertMessages";
import AuthExceptions from "../common/AuthExceptions";
import StorageConstants from "../common/StorageConstants";

const EntervTheatreApp = ({ setShowLoadingSpinner }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const registerNavBtn = "Sign me up";
  const loginNavBtn = "Sign me in";

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

  const checkValidEmailAddress = () => {
    let emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return emailRegex.test(email);
  };

  return (
    <View style={styles.authContainer}>
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
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenTitles.ForgotPassword)}
      >
        <Text style={styles.ticketText}>Forgot Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={enterAsGuest}>
        <Text style={styles.ticketText}>Enter As Guest</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  authContainer: {
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
  textInput: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
    height: 45,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: "#FFFFFF",
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

export default EntervTheatreApp;
