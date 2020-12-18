import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Api from "../../api/Api";
import MovieCard from "./MovieCard";
import UriConstants from "../../api/UriConstants";

const MovieDetails = ({ currentDate }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMoviesApi = async () => {
      const response = await Api.get(UriConstants.getMovies);
      setMovies(response.data);
    };

    getMoviesApi();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {movies.map((movie) => {
          if (
            movie.startDate <= currentDate.format('YYYY-MM-DD') &&
            movie.endDate >= currentDate.format('YYYY-MM-DD')
          ) {
            return <MovieCard key={movie.id} movie={movie} />;
          }
        })}
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
