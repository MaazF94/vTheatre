import React, { useState } from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MovieInfo from "./MovieInfo";
import Showtimes from "./Showtimes";

const MovieCard = ({ movie, selectedDate }) => {

  const [showtimeBtnStyle, setShowtimeBtnStyle] = useState(false);
  const [movieInfoBtnStyle, setMovieInfoBtnStyle] = useState(false);
  const { title, rating, length, genre, img } = movie;

  const showtimesToggle = () => {
    setShowtimeBtnStyle(!showtimeBtnStyle);
    if (movieInfoBtnStyle) {
      setMovieInfoBtnStyle(!movieInfoBtnStyle);
    }
  };

  const movieInfoToggle = () => {
    setMovieInfoBtnStyle(!movieInfoBtnStyle);
    if (showtimeBtnStyle) {
      setShowtimeBtnStyle(!showtimeBtnStyle);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainerWithImg}>
        <Image style={styles.img} source={{ uri: img }} />
        <View style={styles.contentContainerWithoutImg}>
          <Text style={styles.movieTitle}>{title}</Text>
          <View style={styles.ratingTimeAndGenreContainer}>
            <View>
              <Text style={styles.movieRatingTime}>
                {rating} | {length}
              </Text>
            </View>
            <View>
              <Text style={styles.movieGenres}>{genre}</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={showtimesToggle}
              style={
                showtimeBtnStyle
                  ? styles.buttonDisplayShowtimes
                  : styles.buttonShowtimes
              }
            >
              <Text style={styles.buttonText}>Showtimes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={movieInfoToggle}
              style={
                movieInfoBtnStyle
                  ? styles.buttonDisplayMovieInfo
                  : styles.buttonMovieInfo
              }
            >
              <Text style={styles.buttonText}>Movie Info</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {showtimeBtnStyle && <Showtimes movie={movie} selectedDate={selectedDate} />}
      {movieInfoBtnStyle && <MovieInfo movie={movie} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  contentContainerWithImg: {
    flexDirection: "row",
    padding: 10,
  },
  img: {
    width: 132,
    height: 158,
  },
  contentContainerWithoutImg: {
    flexDirection: "column",
    marginLeft: 5,
  },
  movieTitle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  ratingTimeAndGenreContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
  },
  movieRatingTime: {
    color: "#FFFFFF",
    fontSize: 14,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  movieGenres: {
    color: "#FFFFFF",
    fontSize: 14,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    bottom: 0,
  },
  buttonShowtimes: {
    backgroundColor: "#000000",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    width: 105,
    height: 35,
  },
  buttonMovieInfo: {
    backgroundColor: "#000000",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    width: 105,
    height: 35,
    marginLeft: 10,
  },
  buttonDisplayShowtimes: {
    backgroundColor: "#7E0808",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    width: 105,
    height: 35,
  },
  buttonDisplayMovieInfo: {
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

export default MovieCard;
