import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import vtheatre from "../../api/vtheatre";
import MovieCard from "./MovieCard";

const MovieDetails = ({ currentDate }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMoviesApi = async () => {
      const response = await vtheatre.get("/getMovies");
      setMovies(response.data);
    };

    getMoviesApi();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {movies.map((movie) => {
          if (
            movie.startDate <= currentDate.toISOString().split("T")[0] &&
            movie.endDate >= currentDate.toISOString().split("T")[0]
          ) {
            return <MovieCard key={movie.id} movie={movie} />;
          }
        })}
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
