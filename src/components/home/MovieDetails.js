import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MovieCard from "./MovieCard";

const MovieDetails = ({ currentDate }) => {
  const movies = [
    {
      id: 1,
      title: "Black Widow",
      rating: "PG-13",
      length: "2 HRS 10 MINS",
      genre: "ACTION, ADVENTURE, SCI-FI",
      showtimes: ["07:00 PM", "08:00 PM"],
      startDate: new Date(2020, 11, 21),
      endDate: new Date(2020, 11, 21),
      img: require("../../assets/img/black-widow.jpg"),
    },
    {
      id: 2,
      title: "Guardians of the Galaxy",
      rating: "PG-13",
      length: "2 HRS 1 MIN",
      genre: "ACTION, ADVENTURE, COMEDY",
      showtimes: ["07:00 PM", "09:00 PM"],
      startDate: new Date(2020, 11, 20),
      endDate: new Date(2020, 11, 20),
      img: require("../../assets/img/guardians-of-the-galaxy.jpg"),
    },
    {
      id: 3,
      title: "The Dark Knight Rises",
      rating: "PG-13",
      length: "2 HRS 44 MINS",
      genre: "ACTION, THRILLER",
      showtimes: ["07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM"],
      startDate: new Date(2020, 11, 20),
      endDate: new Date(2020, 11, 25),
      img: require("../../assets/img/the-dark-knight-rises.jpg"),
    },
    {
      id: 4,
      title: "Tenet",
      rating: "PG-13",
      length: "2 HRS 10 MINS",
      genre: "ACTION, THRILLER, SCI-FI",
      showtimes: ["07:00 PM", "08:00 PM"],
      startDate: new Date(2020, 11, 20),
      endDate: new Date(2020, 11, 30),
      img: require("../../assets/img/tenet.jpg"),
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {movies.map((movie) => {
          if (
            movie.startDate.getDate() <= currentDate.getDate() &&
            movie.endDate.getDate() >= currentDate.getDate()
          ) {
            return <MovieCard key={movie.id} movie={movie} />;
          }
        })}
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
