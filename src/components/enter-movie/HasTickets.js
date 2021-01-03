import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HasTickets = ({ hasTickets, setHasTickets, movie, showtime }) => {
  const navigation = useNavigation();

  // function updateHasTickets() {
  //   setHasTickets(!hasTickets);
  // }

  return (
    <View style={styles.confirmationContainer}>
      <Text style={styles.text}>Enjoy the showing!</Text>
      <TextInput
        style={styles.textInput}
        width="90%"
        backgroundColor="#ffffff"
        placeholderTextColor="#827D7D"
        // placeholder="Ticket Confirmation Code"
        value="TESTCODE"
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Showing", { movie: movie, showtime: showtime })
        }
        style={styles.button}
      >
        <Text style={styles.buttonText}>Enter</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={updateHasTickets}>
        <Text style={styles.ticketText}>No code? Buy tickets.</Text>
      </TouchableOpacity> */}
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