import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MovieCard from "./"

const MovieDetails = () => {
  const movies = [
    {
      title: "Black Widow",
      rating: "PG-13",
      length: "2 HRS 10 MINS",
      genre: "ACTION, ADVENTURE, SCI-FI"
    },
    {
      title: "Black Widow",
      rating: "PG-13",
      length: "2 HRS 10 MINS",
      genre: "ACTION, ADVENTURE, SCI-FI",
    },
    {
      title: "Black Widow",
      rating: "PG-13",
      length: "2 HRS 10 MINS",
      genre: "ACTION, ADVENTURE, SCI-FI",
    },
    {
      title: "Black Widow",
      rating: "PG-13",
      length: "2 HRS 10 MINS",
      genre: "ACTION, ADVENTURE, SCI-FI",
    },
    {
      title: "Black Widow",
      rating: "PG-13",
      length: "2 HRS 10 MINS",
      genre: "ACTION, ADVENTURE, SCI-FI",
    },
    {
      title: "Black Widow",
      rating: "PG-13",
      length: "2 HRS 10 MINS",
      genre: "ACTION, ADVENTURE, SCI-FI",
    },
  ]

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {
          movies.map((movie) => {
            return <MovieCard movie={movie} />
          }) 
        }
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
