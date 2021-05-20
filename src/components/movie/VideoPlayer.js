import React, { useEffect, useState, useRef } from "react";
import { Dimensions, AppState, Platform } from "react-native";
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
import Video from "react-native-video";
import DrmConfigs from "../common/DrmConfigs";

const VideoPlayer = ({
  showtime,
  movie,
  selectedDate,
  ticketPrice,
  iosProductId,
  username,
  licenseToken,
}) => {
  ScreenCapture.usePreventScreenCapture();

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
  const [pause, setPause] = useState(true);
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
      if (
        (Platform.OS === "android" && ticketPrice !== 0) ||
        (Platform.OS === "ios" && iosProductId !== null)
      ) {
        updateTicketStatus("ACTIVE");
      }
    } else if (nextAppState === "active") {
      if (isFocused) {
        intervalId = clearInterval(intervalId);
        navigation.goBack();
      }
    }
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
          setShowCountdown(false);
          setPause(false);
          positionInStream = moment.duration(
            moment(new Date()).diff(movieDateTime)
          );
          videoRef.current.seek(positionInStream.asMilliseconds() / 1000);
        }
      }
    }, 1000);
  };

  const headerToggle = () => {
    setHeaderShown(!headerShown);
    navigation.setOptions({
      headerShown: !headerShown,
    });
  };

  const onPlaybackLoading = () => {
    setActivityIndicator({ opacity: 1 });
  };

  const onPlaybackLoaded = () => {
    setActivityIndicator({ opacity: 0 });
  };

  const onEnd = () => {
    setMovieEndedText({ opacity: 1 });
    wait(3000).then(() => navigation.navigate(ScreenTitles.HomeScreen));
  };

  const onError = async () => {
    const networkStatus = await Network.getNetworkStateAsync();
    if (!networkStatus.isConnected) {
      setPause(true);
      setActivityIndicator(true);
      wait(3000).then(() => {
        navigation.navigate(ScreenTitles.HomeScreen);
      });
    }
  };

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  return (
    <TouchableOpacity onPress={headerToggle}>
      {movie.drmEnabled === 0 && (
        <Video
          source={{
            uri: movie.vid,
          }}
          style={{ width: width, height: height }}
          resizeMode="contain"
          rate={1.0}
          volume={1.0}
          ref={videoRef}
          poster={movie.img}
          onLoadStart={onPlaybackLoading}
          onLoad={onPlaybackLoaded}
          paused={pause}
          onEnd={onEnd}
          onError={onError}
          allowsExternalPlayback={false}
          ignoreSilentSwitch="ignore"
          playWhenInactive={true}
        />
      )}
      {Platform.OS === "ios" && movie.drmEnabled === 1 && (
        <Video
          source={{
            uri: movie.fairplayPlayback,
          }}
          drm={{
            type: "fairplay",
            licenseServer: DrmConfigs.licenseServer,
            certificateUrl:
              DrmConfigs.certificateUrl,
            headers: {
              "pallycon-customdata-v2": licenseToken,
            },
          }}
          style={{ width: width, height: height }}
          resizeMode="contain"
          rate={1.0}
          volume={1.0}
          ref={videoRef}
          poster={movie.img}
          onLoadStart={onPlaybackLoading}
          onLoad={onPlaybackLoaded}
          paused={pause}
          onEnd={onEnd}
          onError={onError}
          allowsExternalPlayback={false}
          ignoreSilentSwitch="ignore"
          playWhenInactive={true}
        />
      )}
      {Platform.OS === "android" && movie.drmEnabled === 1 && (
        <Video
          source={{
            uri: movie.widevinePlayback,
          }}
          drm={{
            type: "widevine",
            licenseServer: DrmConfigs.licenseServer,
            headers: {
              "pallycon-customdata-v2": licenseToken,
            },
          }}
          style={{ width: width, height: height }}
          resizeMode="contain"
          rate={1.0}
          volume={1.0}
          ref={videoRef}
          poster={movie.img}
          onLoadStart={onPlaybackLoading}
          onLoad={onPlaybackLoaded}
          paused={pause}
          onEnd={onEnd}
          onError={onError}
          allowsExternalPlayback={false}
          ignoreSilentSwitch="ignore"
          playWhenInactive={true}
        />
      )}
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
