import React, { useEffect, useState } from "react";
import {
  View,
  RefreshControl,
  ScrollView,
  Alert,
  BackHandler,
} from "react-native";
import Api from "../../api/Api";
import MovieCard from "./MovieCard";
import UriConstants from "../../api/UriConstants";
import moment from "moment";
import * as Network from "expo-network";
import AlertMessages from "../common/AlertMessages";
import { useIsFocused } from "@react-navigation/native";
import HttpHeaders from "../common/HttpHeaders";

const MovieDetails = ({ selectedDate }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [movies, setMovies] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getMoviesApi();
    }
  }, [isFocused]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert(AlertMessages.ExitvTheatreTitle, "", [
        {
          text: AlertMessages.ExitvTheatreYesMsg,
          onPress: () => BackHandler.exitApp(),
        },
        {
          text: AlertMessages.ExitvTheatreNoMsg,
          onPress: () => null,
          style: "cancel",
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getMoviesApi();
    wait(1000).then(() => setRefreshing(false));
  }, [refreshing]);

  const getMoviesApi = async () => {
    const networkStatus = await Network.getNetworkStateAsync();
    if (!networkStatus.isConnected) {
      Alert.alert(
        AlertMessages.ConnectivityErrorTitle,
        AlertMessages.ConnectivityErrorMsg
      );
      return;
    }

    await Api.get(UriConstants.getMovies, {
      headers: HttpHeaders.headers,
    })
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        Alert.alert(AlertMessages.ErrorTitle, AlertMessages.ErrorMsg);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {movies !== null &&
          movies.map((movie) => {
            if (
              movie.startDate <= moment(selectedDate).format("YYYY-MM-DD") &&
              movie.endDate >= moment(selectedDate).format("YYYY-MM-DD")
            ) {
              return (
                <MovieCard
                  key={movie.movieId}
                  movie={movie}
                  selectedDate={selectedDate}
                />
              );
            }
          })}
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
