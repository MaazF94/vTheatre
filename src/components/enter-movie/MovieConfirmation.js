import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import HasTickets from "./HasTickets";
import PurchaseTicket from "./PurchaseTicket";

const MovieConfirmation = ({ movie, showtime }) => {
  const navigation = useNavigation();
  const [enableEnterMovie, setEnableEnterMovie] = useState(true);

  function GetMovieConfirmationContent() {
    if (enableEnterMovie) {
      return (
        <HasTickets
          movie={movie}
          showtime={showtime}
          hasTickets={enableEnterMovie}
          setHasTickets={setEnableEnterMovie}
        />
      );
    } else {
      return (
        <PurchaseTicket
          movie={movie}
          showtime={showtime}
          hasTickets={enableEnterMovie}
          setHasTickets={setEnableEnterMovie}
        />
      );
    }
  }

  return <GetMovieConfirmationContent />;
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
    height: 34,
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

export default MovieConfirmation;
