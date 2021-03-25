import React, { useEffect, useState, useRef } from "react";
import { Audio, Video } from "expo-av";
import { Dimensions, AppState, Platform, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import VideoActivityIndicator from "./VideoActivityIndicator";
import VideoEnded from "./VideoEnded";
import ShowtimeCountdown from "./ShowtimeCountdown";
import ScreenTitles from "../common/ScreenTitles";
import { useIsFocused } from "@react-navigation/native";
import * as Network from "expo-network";
import Api from "../../api/Api";
import UriConstants from "../../api/UriConstants";
import * as ScreenCapture from "expo-screen-capture";
import HttpHeaders from "../common/HttpHeaders";
import { useKeepAwake } from "expo-keep-awake";
import AlertMessages from "../common/AlertMessages";

const VideoPlayer = ({
  showtime,
  movie,
  selectedDate,
  ticketPrice,
  iosProductId,
  username,
}) => {
  ScreenCapture.usePreventScreenCapture();
  useKeepAwake();

  // Common variables
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  let positionInStream = moment.duration(
    moment(new Date()).diff(movieDateTime)
  );
  let intervalId = 0;

  // Video variables
  const { width, height } = Dimensions.get("window");
  const videoRef = useRef();
  const movieShowtime = moment(showtime, "hh:mm a");
  const movieDateTime = moment(selectedDate)
    .hours(movieShowtime.hours())
    .minutes(movieShowtime.minutes())
    .seconds(movieShowtime.seconds());

  // State variables
  const [appState, setAppState] = useState(AppState.currentState);
  const [headerShown, setHeaderShown] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [usePoster, setUsePoster] = useState(true);
  const [timeLeft, setTimeLeft] = useState(
    moment.duration(movieDateTime.diff(moment(new Date())))
  );
  const [activityIndicator, setActivityIndicator] = useState({
    opacity: 0,
  });
  const [movieEndedText, setMovieEndedText] = useState({
    opacity: 0,
  });
  const [showCountdown, setShowCountdown] = useState(true);
  const [stoppedVidPosition, setStoppedVidPosition] = useState(
    moment(new Date())
  );
  const stoppedVidPositionRef = useRef();
  stoppedVidPositionRef.current = stoppedVidPosition;

  useEffect(() => {
    if (isFocused) {
      if (intervalId !== undefined) {
        intervalId = clearInterval(intervalId);
      }
      if (
        (Platform.OS === "android" && ticketPrice !== 0) ||
        (Platform.OS === "ios" && iosProductId !== null)
      ) {
        updateTicketStatus("INACTIVE");
      }
      enterUserInMovie();
    }

    return () => {
      if (intervalId !== undefined) {
        intervalId = clearInterval(intervalId);
      }
      if (movieDateTime < moment(new Date()) && showtimeHasNotEnded(showtime)) {
        recordTimeUserWatched();
      }
      if (
        (Platform.OS === "android" && ticketPrice !== 0) ||
        (Platform.OS === "ios" && iosProductId !== null)
      ) {
        updateTicketStatus("ACTIVE");
      }
    };
  }, [isFocused]);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, [appState]);

  useEffect(() => {
    ScreenCapture.addScreenshotListener(() => {
      wait(1000).then(() => {
        navigation.navigate(ScreenTitles.HomeScreen);
      });
    });
  });

  const _handleAppStateChange = (nextAppState) => {
    if (nextAppState === "background") {
      if (movieDateTime < moment(new Date()) && showtimeHasNotEnded(showtime)) {
        recordTimeUserWatched();
      }
      updateTicketStatus("ACTIVE");
    } else if (nextAppState === "active") {
      if (isFocused) {
        intervalId = clearInterval(intervalId);
        verifyTicket();
        enterUserInMovie();
      }
      updateTicketStatus("INACTIVE");
    }
  };

  const verifyTicket = async () => {
    const networkStatus = await Network.getNetworkStateAsync();
    if (!networkStatus.isConnected) {
      Alert.alert(
        AlertMessages.ConnectivityErrorTitle,
        AlertMessages.ConnectivityErrorMsg
      );
      return;
    }

    let verifyTicketResponse;
    const verifyTicketRequest = {
      username: username,
      chosenDate: moment(selectedDate).format("YYYY-MM-DD"),
      showtime: showtime,
      movieId: movie.movieId,
    };

    await Api.post(UriConstants.verifyTicket, verifyTicketRequest, {
      headers: HttpHeaders.headers,
    })
      .then((response) => {
        verifyTicketResponse = response.data;

        if (verifyTicketResponse.status === "INACTIVE") {
          Alert.alert(
            AlertMessages.TicketStatusInactiveTitle,
            AlertMessages.TicketStatusInactiveMsg
          );
          navigation.goBack();
        }
      })
      .catch(() => {
        Alert.alert(AlertMessages.ErrorTitle, AlertMessages.ErrorMsg);
      });
  };

  const updateTicketStatus = (status) => {
    const ticketStatusRequest = {
      username: username,
      chosenDate: selectedDate,
      showtime: showtime,
      status: status,
      movieId: movie.movieId,
    };
    Api.post(
      UriConstants.updateTicketStatus,
      ticketStatusRequest,
      HttpHeaders.headers
    )
      .then(() => {})
      .catch(() => {});
  };

  const enterUserInMovie = () => {
    intervalId = setInterval(() => {
      if (movieDateTime > moment(new Date())) {
        setTimeLeft(moment.duration(movieDateTime.diff(moment(new Date()))));
      } else {
        if (intervalId !== undefined) {
          intervalId = clearInterval(intervalId);
        }
        if (videoRef.current !== null) {
          setActivityIndicator({ opacity: 1 });
          setUsePoster(false);
          setShowCountdown(false);
          setShouldPlay(true);
          positionInStream = moment.duration(
            moment(new Date()).diff(movieDateTime)
          );
          videoRef.current.playFromPositionAsync(
            positionInStream.asMilliseconds()
          );
          Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        }
      }
    }, 1000);
  };

  const recordTimeUserWatched = async () => {
    const networkStatus = await Network.getNetworkStateAsync();
    if (networkStatus.isConnected) {
      const videoTimeWatched = moment.duration(
        stoppedVidPositionRef.current.diff(positionInStream.asMilliseconds())
      );
      const videoTimeWatchedRequest = {
        hours: videoTimeWatched.hours(),
        minutes: videoTimeWatched.minutes(),
        seconds: videoTimeWatched.seconds(),
        movieId: movie.movieId,
      };
      Api.post(UriConstants.recordVideoTimeWatched, videoTimeWatchedRequest, {
        headers: HttpHeaders.headers,
      })
        .then(() => {})
        .catch(() => {});
    }
  };

  const headerToggle = () => {
    setHeaderShown(!headerShown);
    navigation.setOptions({
      headerShown: !headerShown,
    });
  };

  const showtimeHasNotEnded = (showtime) => {
    if (
      moment(selectedDate).format("MM/DD/YYYY") ===
      moment(new Date()).format("MM/DD/YYYY")
    ) {
      const hrs = movie.length.includes("HR") ? movie.length.substr(0, 1) : 0;
      const mins = movie.length.includes("MIN")
        ? movie.length.substring(
            movie.length.indexOf("MIN") - 3,
            movie.length.indexOf("MIN")
          )
        : 0;
      const secs = movie.length.includes("SEC")
        ? movie.length.substring(
            movie.length.indexOf("SEC") - 3,
            movie.length.indexOf("SEC")
          )
        : 0;

      const movieEndTime = moment(showtime, "HH:mm a");
      const currentTime = moment(new Date());

      if (
        currentTime >
        movieEndTime
          .add(parseInt(hrs), "hours")
          .add(parseInt(mins), "minutes")
          .add(parseInt(secs), "seconds")
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const onPlaybackStatusUpdate = async (playbackStatus) => {
    if (playbackStatus.isBuffering && !playbackStatus.isPlaying) {
      setActivityIndicator({ opacity: 1 });
    } else {
      const networkStatus = await Network.getNetworkStateAsync();
      if (networkStatus.isConnected) {
        setActivityIndicator({ opacity: 0 });
        if (playbackStatus.isPlaying) {
          setStoppedVidPosition(moment(playbackStatus.positionMillis));
        }
      } else {
        if (videoRef.current !== null) {
          videoRef.current.pauseAsync();
        }
        wait(3000).then(() => {
          navigation.navigate(ScreenTitles.HomeScreen);
        });
      }
    }

    if (playbackStatus.didJustFinish) {
      setMovieEndedText({ opacity: 1 });
      wait(3000).then(() => navigation.navigate(ScreenTitles.HomeScreen));
    }
  };

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  return (
    <TouchableOpacity onPress={headerToggle}>
      <Video
        source={{
          uri: movie.vid,
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={shouldPlay}
        style={{ width: width, height: height }}
        ref={videoRef}
        posterSource={{ uri: movie.img }}
        usePoster={usePoster}
        onPlaybackStatusUpdate={(playbackStatus) =>
          onPlaybackStatusUpdate(playbackStatus)
        }
      />
      <VideoActivityIndicator activityIndicator={activityIndicator} />
      <VideoEnded movieEndedText={movieEndedText} />
      <ShowtimeCountdown
        showCountdown={showCountdown}
        days={timeLeft.days().toString()}
        hours={timeLeft.hours().toString()}
        mins={timeLeft.minutes().toString()}
        secs={timeLeft.seconds().toString()}
      />
    </TouchableOpacity>
  );
};

export default VideoPlayer;
