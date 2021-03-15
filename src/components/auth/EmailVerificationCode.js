import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Auth } from "aws-amplify";
import AlertMessages from "../common/AlertMessages";
import AuthExceptions from "../common/AuthExceptions";
import AuthAlertMessages from "../common/AuthAlertMessages";

const EmailVerificationCode = ({
  setShowVerificationSection,
  setShowLoadingSpinner,
  email,
  setEmail,
}) => {
  const sendVerificationCode = () => {
    const valid = checkValidEmailAddress();
    if (!valid) {
      Alert.alert(
        AlertMessages.InvalidEmailAddressTitle,
        AlertMessages.InvalidEmailAddressMsg
      );
      return;
    }
    setShowLoadingSpinner(true);
    Auth.forgotPassword(email)
      .then(() => {
        setShowLoadingSpinner(false);
        setShowVerificationSection(true);
        Alert.alert(
          AuthAlertMessages.VerificationCodeSentTitle,
          AuthAlertMessages.VerificationCodeSentMsg
        );
      })
      .catch((error) => {
        setShowLoadingSpinner(false);
        if (error.name === AuthExceptions.LimitExceededException) {
          Alert.alert(
            AuthAlertMessages.LimitExceededExceptionTitle,
            AuthAlertMessages.LimitExceededExceptionMsg
          );
        } else {
          Alert.alert(AlertMessages.ErrorTitle, AlertMessages.ErrorMsg);
        }
      });
  };

  const checkValidEmailAddress = () => {
    let emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return emailRegex.test(email);
  };

  return (
    <View style={styles.verificationContainer}>
      <Text style={styles.text}>Forgot Password?</Text>
      <TextInput
        style={styles.textInput}
        width="90%"
        backgroundColor="#ffffff"
        placeholderTextColor="#827D7D"
        placeholder="Email"
        onChangeText={(value) => setEmail(value)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={sendVerificationCode}
          style={styles.verificationBtn}
        >
          <Text style={styles.buttonText}>Request Verification Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  verificationContainer: {
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
  verificationBtn: {
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
  ticketText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: "underline",
  },
});

export default EmailVerificationCode;
