import React from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MovieDetails = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require("../assets/black-widow.jpg")} />
      <View>
        <Text style={styles.movieTitle}>Black Widow</Text>
        <View
          style={{
            bottom: 0,
            position: "absolute",
            justifyContent: "flex-end",
          }}
        >
          <View style={styles.movieDetailContainer}>
            <Text style={styles.movieRatingTime}>PG-13 | 2 HRS 10 MINS</Text>
            <Text style={styles.movieGenres}>ACTION, ADVENTURE, SCI-FI</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Second")}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Showtimes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Movie Info</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
  },
  img: {
    width: 132,
    height: 158,
  },
  movieDetailContainer: {
    flexDirection: "column",
  },
  movieTitle: {
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
    marginTop: 14,
  },
  movieRatingTime: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Roboto",
    fontWeight: "100",
    marginLeft: 10,
    textShadowColor: "#6e706f",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  movieGenres: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Roboto",
    fontWeight: "100",
    marginLeft: 10,
    textShadowColor: "#6e706f",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: "#000000",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ffffff",
    alignItems: "center",
    textAlign: "center",
    padding: 5,
    width: 105,
    height: 35,
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MovieDetails;
