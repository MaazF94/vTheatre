import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import ScreenTitles from "../common/ScreenTitles";
import AuthAlertMessages from "../common/AuthAlertMessages";
import AuthExceptions from "../common/AuthExceptions";
import AlertMessages from "../common/AlertMessages";

const NewPassword = ({ email, setShowLoadingSpinner }) => {
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const navigation = useNavigation();

  const confirmNewPassword = () => {
    setShowLoadingSpinner(true);
    Auth.forgotPasswordSubmit(email, verificationCode, password)
      .then(() => {
        setShowLoadingSpinner(false);
        Alert.alert(
          AuthAlertMessages.PasswordSuccesfullyResetTitle,
          AuthAlertMessages.PasswordSuccesfullyResetMsg
        );
        navigation.navigate(ScreenTitles.AuthScreen);
      })
      .catch((error) => {
        setShowLoadingSpinner(false);
        if (error.name === AuthExceptions.AuthError) {
          Alert.alert(
            AuthAlertMessages.AuthErrorTitle,
            AuthAlertMessages.AuthErrorMsg
          );
        } else if (error.name === AuthExceptions.InvalidParameterException) {
          Alert.alert(
            AuthAlertMessages.InvalidPasswordExceptionTitle,
            AuthAlertMessages.InvalidPasswordExceptionMsg
          );
        } else if (error.name === AuthExceptions.CodeMismatchException) {
          Alert.alert(
            AuthAlertMessages.InvalidPasswordExceptionTitle,
            AuthAlertMessages.InvalidPasswordExceptionMsg
          );
        } else if (error.name === AuthExceptions.LimitExceededException) {
          Alert.alert(
            AuthAlertMessages.LimitExceededExceptionTitle,
            AuthAlertMessages.LimitExceededExceptionMsg
          );
        } else {
          Alert.alert(AlertMessages.ErrorTitle, AlertMessages.ErrorMsg);
        }
      });
  };

  return (
    <View style={styles.forgotPasswordContainer}>
      <Text style={styles.text}>Forgot Password?</Text>
      <TextInput
        style={styles.textInput}
        width="90%"
        backgroundColor="#ffffff"
        placeholderTextColor="#827D7D"
        placeholder="Verification Code"
        onChangeText={(value) => setVerificationCode(value)}
      />
      <TextInput
        style={styles.textInput}
        width="90%"
        backgroundColor="#ffffff"
        placeholderTextColor="#827D7D"
        placeholder="New Password"
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={confirmNewPassword}
          style={styles.confirmBtn}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  forgotPasswordContainer: {
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
  confirmBtn: {
    backgroundColor: "#7E0808",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    padding: 10,
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
});

export default NewPassword;
