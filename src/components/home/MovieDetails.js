import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import vtheatre from "../../api/vtheatre";
import MovieCard from "./MovieCard";

const MovieDetails = ({ currentDate }) => {

  const [movies, setMovies] = useState();
  const [loaded, setLoaded] = useState([false])

  useEffect(() => {

    const getMoviesApi = async () => {
      const response = await vtheatre.get('/getMovies');
      setMovies(response.data);
      setLoaded(true);
      };

      getMoviesApi();

  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loaded && movies.map((movie) => {
          if (
            movie.startDate <= currentDate.getDate() &&
            movie.endDate >= currentDate.getDate()
          ) {
            return <MovieCard key={movie.id} movie={movie} />;
          }
        })}
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
