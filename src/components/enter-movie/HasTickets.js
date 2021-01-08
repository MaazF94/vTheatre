import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Api from "../../api/Api";
import UriConstants from "../../api/UriConstants";
import AlertMessages from "../common/AlertMessages";
import HttpHeaders from "../common/HttpHeaders";
import ScreenTitles from "../common/ScreenTitles";

const HasTickets = ({
  hasTickets,
  setHasTickets,
  movie,
  selectedShowtimeObj,
}) => {
  
  const navigation = useNavigation();
  const [confirmationCode, setConfirmationCode] = useState("");

  const updateHasTickets = () => {
    setHasTickets(!hasTickets);
  };

  const verifyConfirmationCode = async () => {
    Keyboard.dismiss();
    
    if (confirmationCode.length === 0) {
      Alert.alert(
        AlertMessages.InvalidConfirmationCodeTitle,
        AlertMessages.InvalidConfirmationCodeMsg
      );
      return;
    }

    const confirmationCodeExists = await Api.post(
      UriConstants.verifyConfirmationCode,
      confirmationCode,
      { headers: HttpHeaders.headers }
    );

    confirmationCodeExists.data
      ? navigation.navigate(ScreenTitles.MovieScreen, {
          movie: movie,
          showtime: selectedShowtimeObj,
        })
      : Alert.alert(
          AlertMessages.InvalidConfirmationCodeTitle,
          AlertMessages.InvalidConfirmationCodeMsg
        );
  };

  return (
    <View style={styles.confirmationContainer}>
      <Text style={styles.text}>Enjoy the showing!</Text>
      <TextInput
        style={styles.textInput}
        width="90%"
        backgroundColor="#ffffff"
        placeholderTextColor="#827D7D"
        placeholder="Ticket Confirmation Code"
        onChangeText={(value) => setConfirmationCode(value)}
      />
      <TouchableOpacity onPress={verifyConfirmationCode} style={styles.button}>
        <Text style={styles.buttonText}>Enter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={updateHasTickets}>
        <Text style={styles.ticketText}>No code? Buy tickets.</Text>
      </TouchableOpacity>
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
    paddingBottom: 10,
    paddingTop: 10,
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  textInput: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    height: 45,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#7E0808",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
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

export default HasTickets;
