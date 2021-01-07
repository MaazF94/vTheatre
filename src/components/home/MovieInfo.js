import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MovieInfo = ({ movie }) => {
  
  const { synopsis, cast } = movie;

  return (
    <View style={styles.movieInfoContainer}>
      <View>
        <Text style={styles.header}>Synopsis</Text>
        <Text style={styles.description}>{synopsis}</Text>
      </View>
      <View>
        <Text style={styles.header}>Cast</Text>
        <Text style={styles.description}>{cast}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  movieInfoContainer: {
    flexDirection: "column",
  },
  header: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  description: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 11,
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default MovieInfo;
