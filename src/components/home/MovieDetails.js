import React, { useState } from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Showtimes from "./Showtimes";
import Constants from "expo-constants";

const MovieDetails = () => {
  const [displayShowtimes, setDisplayShowtimes] = useState(false);
  const [showtimeBtnStyle, setShowtimeBtnStyle] = useState(styles.button);

  function showtimesToggle() {
    setDisplayShowtimes(!displayShowtimes);
    if (displayShowtimes) {
      setShowtimeBtnStyle(styles.button);
    } else {
      setShowtimeBtnStyle(styles.buttonDisplayShowtimes);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "column" }}>
          <View style={styles.container}>
            <Image
              style={styles.img}
              source={require("../../assets/img/black-widow.jpg")}
            />
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
                  <Text style={styles.movieRatingTime}>
                    PG-13 | 2 HRS 10 MINS
                  </Text>
                  <Text style={styles.movieGenres}>
                    ACTION, ADVENTURE, SCI-FI
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => showtimesToggle()}
                      style={showtimeBtnStyle}
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
          {displayShowtimes && <Showtimes />}
        </View>
        <View style={{ flexDirection: "column" }}>
          <View style={styles.container}>
            <Image
              style={styles.img}
              source={require("../../assets/img/black-widow.jpg")}
            />
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
                  <Text style={styles.movieRatingTime}>
                    PG-13 | 2 HRS 10 MINS
                  </Text>
                  <Text style={styles.movieGenres}>
                    ACTION, ADVENTURE, SCI-FI
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => showtimesToggle()}
                      style={showtimeBtnStyle}
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
          {displayShowtimes && <Showtimes />}
        </View>
        <View style={{ flexDirection: "column" }}>
          <View style={styles.container}>
            <Image
              style={styles.img}
              source={require("../../assets/img/black-widow.jpg")}
            />
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
                  <Text style={styles.movieRatingTime}>
                    PG-13 | 2 HRS 10 MINS
                  </Text>
                  <Text style={styles.movieGenres}>
                    ACTION, ADVENTURE, SCI-FI
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => showtimesToggle()}
                      style={showtimeBtnStyle}
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
          {displayShowtimes && <Showtimes />}
        </View>
        <View style={{ flexDirection: "column" }}>
          <View style={styles.container}>
            <Image
              style={styles.img}
              source={require("../../assets/img/black-widow.jpg")}
            />
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
                  <Text style={styles.movieRatingTime}>
                    PG-13 | 2 HRS 10 MINS
                  </Text>
                  <Text style={styles.movieGenres}>
                    ACTION, ADVENTURE, SCI-FI
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => showtimesToggle()}
                      style={showtimeBtnStyle}
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
          {displayShowtimes && <Showtimes />}
        </View>
        <View style={{ flexDirection: "column" }}>
          <View style={styles.container}>
            <Image
              style={styles.img}
              source={require("../../assets/img/black-widow.jpg")}
            />
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
                  <Text style={styles.movieRatingTime}>
                    PG-13 | 2 HRS 10 MINS
                  </Text>
                  <Text style={styles.movieGenres}>
                    ACTION, ADVENTURE, SCI-FI
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => showtimesToggle()}
                      style={showtimeBtnStyle}
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
          {displayShowtimes && <Showtimes />}
        </View>
        <View style={{ flexDirection: "column" }}>
          <View style={styles.container}>
            <Image
              style={styles.img}
              source={require("../../assets/img/black-widow.jpg")}
            />
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
                  <Text style={styles.movieRatingTime}>
                    PG-13 | 2 HRS 10 MINS
                  </Text>
                  <Text style={styles.movieGenres}>
                    ACTION, ADVENTURE, SCI-FI
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => showtimesToggle()}
                      style={showtimeBtnStyle}
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
          {displayShowtimes && <Showtimes />}
        </View>
        <View style={{ flexDirection: "column" }}>
          <View style={styles.container}>
            <Image
              style={styles.img}
              source={require("../../assets/img/black-widow.jpg")}
            />
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
                  <Text style={styles.movieRatingTime}>
                    PG-13 | 2 HRS 10 MINS
                  </Text>
                  <Text style={styles.movieGenres}>
                    ACTION, ADVENTURE, SCI-FI
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => showtimesToggle()}
                      style={showtimeBtnStyle}
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
          {displayShowtimes && <Showtimes />}
        </View>
        <View style={{ flexDirection: "column" }}>
          <View style={styles.container}>
            <Image
              style={styles.img}
              source={require("../../assets/img/black-widow.jpg")}
            />
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
                  <Text style={styles.movieRatingTime}>
                    PG-13 | 2 HRS 10 MINS
                  </Text>
                  <Text style={styles.movieGenres}>
                    ACTION, ADVENTURE, SCI-FI
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => showtimesToggle()}
                      style={showtimeBtnStyle}
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
          {displayShowtimes && <Showtimes />}
        </View>
      </ScrollView>
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

    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
    marginTop: 14,
  },
  movieRatingTime: {
    color: "#FFFFFF",
    fontSize: 14,
    marginLeft: 10,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  movieGenres: {
    color: "#FFFFFF",
    fontSize: 14,
    marginLeft: 10,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    marginTop: 20,
    marginLeft: 10,
    backgroundColor: "#000000",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    width: 105,
    height: 35,
  },
  buttonDisplayShowtimes: {
    marginTop: 20,
    marginLeft: 10,
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
    fontSize: 14,
  },
});

export default MovieDetails;
