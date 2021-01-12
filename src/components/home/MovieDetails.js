import React, { useEffect, useState } from "react";
import { View, RefreshControl, ScrollView } from "react-native";
import {  } from "react-native-gesture-handler";
import Api from "../../api/Api";
import MovieCard from "./MovieCard";
import UriConstants from "../../api/UriConstants";

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const MovieDetails = ({ selectedDate }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMoviesApi();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getMoviesApi();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const getMoviesApi = async () => {
    const response = await Api.get(UriConstants.getMovies);
    setMovies(response.data);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {movies.map((movie) => {
          if (
            movie.startDate <= selectedDate.format('YYYY-MM-DD') &&
            movie.endDate >= selectedDate.format('YYYY-MM-DD')
          ) {
            return <MovieCard key={movie.id} movie={movie} selectedDate={selectedDate} />;
          }
        })}
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
