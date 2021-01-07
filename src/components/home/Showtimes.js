import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScreenTitles from "../common/ScreenTitles";

const Showtimes = ({ movie, selectedDate }) => {
  
  const navigation = useNavigation();
  const { showtimes } = movie;

  return (
    <View style={styles.showtimesContainer}>
      {showtimes.map((showtimeObj) => {
        return (
          <TouchableOpacity
            key={showtimeObj.showtimeId}
            onPress={() =>
              navigation.navigate(ScreenTitles.EnterMovie, {
                movie: movie,
                selectedShowtimeObj: showtimeObj,
                selectedDate: JSON.stringify(selectedDate)
              })
            }
            style={styles.button}
          >
            <Text key={showtimeObj.showtime} style={styles.buttonText}>
              {showtimeObj.showtime}
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
