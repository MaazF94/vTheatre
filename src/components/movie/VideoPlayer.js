import React, { useEffect, useState, useRef } from "react";
import { Video } from "expo-av";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import VideoActivityIndicator from "./VideoActivityIndicator";
import VideoEnded from "./VideoEnded";
import ShowtimeCountdown from "./ShowtimeCountdown";
import ScreenTitles from "../common/ScreenTitles";
import { useIsFocused } from "@react-navigation/native";
import * as Network from "expo-network";

const VideoPlayer = ({ showtime, movie, selectedDate }) => {
  // Common variables
  const navigation = useNavigation();
  let intervalId = 0;
  const isFocused = useIsFocused();

  // Video variables
  const { width, height } = Dimensions.get("window");
  const videoRef = useRef();
  const movieShowtime = moment(showtime, "hh:mm a");
  const movieDateTime = moment(selectedDate)
    .hours(movieShowtime.hours())
    .minutes(movieShowtime.minutes())
    .seconds(movieShowtime.seconds());

  // State variables
  const [headerShown, setHeaderShown] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [usePoster, setUsePoster] = useState(true);
  const [timeLeft, setTimeLeft] = useState(
    moment.duration(movieDateTime.diff(moment()))
  );
  const [activityIndicator, setActivityIndicator] = useState({
    opacity: 0,
  });
  const [movieEndedText, setMovieEndedText] = useState({
    opacity: 0,
  });
  const [showCountdown, setShowCountdown] = useState(true);

  useEffect(() => {
    const enterUserInMovie = () => {
      intervalId = setInterval(() => {
        if (movieDateTime > moment()) {
          setTimeLeft(moment.duration(movieDateTime.diff(moment())));
        } else {
          if (videoRef.current !== null) {
            const positionInStream = moment.duration(
              moment().diff(movieDateTime)
            );
            setActivityIndicator({ opacity: 1 });
            setUsePoster(false);
            setShowCountdown(false);
            setShouldPlay(true);
            videoRef.current.playFromPositionAsync(
              positionInStream.asMilliseconds()
            );
          }
          intervalId = clearInterval(intervalId);
        }
      }, 1000);
    };

    if (isFocused) {
      intervalId = clearInterval(intervalId);
      enterUserInMovie();
    }

    return () => {
      if (intervalId !== undefined) {
        intervalId = clearInterval(intervalId);
      }
    };
  }, [isFocused]);

  const headerToggle = () => {
    setHeaderShown(!headerShown);
    navigation.setOptions({
      headerShown: !headerShown,
    });
  };

  const onPlaybackStatusUpdate = async (playbackStatus) => {
    if (playbackStatus.isBuffering && !playbackStatus.isPlaying) {
      setActivityIndicator({ opacity: 1 });
    } else {
      const networkStatus = await Network.getNetworkStateAsync();
      if (networkStatus.isConnected) {
        setActivityIndicator({ opacity: 0 });
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
          uri:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
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
