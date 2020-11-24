import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Showtimes = ({ movie }) => {
  const navigation = useNavigation();
  const { showtimes } = movie;

  return (
    <View style={styles.showtimesContainer}>
      {showtimes.map((showtime) => {
        return (
          <TouchableOpacity
            key={showtime}
            onPress={() =>
              navigation.navigate("Enter Movie", {
                movie: movie,
                showtime: showtime,
              })
            }
            style={styles.button}
          >
            <Text key={showtime} style={styles.buttonText}>
              {showtime}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
showtimesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginBottom: 10,
    backgroundColor: "#7E0808",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    width: 105,
    height: 35,
    marginLeft: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default Showtimes;
