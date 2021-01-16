import React, { useEffect, useState, useRef } from "react";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";
import moment from "moment";

const VideoPlayer = ({ showtime, movie, selectedDate }) => {
  // Common variables
  const navigation = useNavigation();
  let landscape = true;

  // Video variables
  const { width, height } = Dimensions.get("window");
  const playerHeight = width < height ? width : height;
  const playerWidth = width > height ? width : height;
  const videoRef = useRef();
  const movieShowtime = moment(showtime, "hh:mm a");
  const movieDateTime = moment(selectedDate, "YYYY-MM-DD")
    .hours(movieShowtime.hours())
    .minutes(movieShowtime.minutes());

  // State variables
  const [headerShown, setHeaderShown] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [usePoster, setUsePoster] = useState(true);
  const [timeForTimer, setTimeForTimer] = useState(
    moment.duration(movieDateTime - moment())
  );
  const [days, setDays] = useState(timeForTimer.days());
  const [hours, setHours] = useState(timeForTimer.hours());
  const [mins, setMins] = useState(timeForTimer.minutes());
  const [secs, setSecs] = useState(timeForTimer.seconds());

  useEffect(() => {
    const rotateLandscape = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };

    const enterUserInMovie = () => {
      const intervalId = setInterval(() => {
        if (timeForTimer > 0) {
          setTimeForTimer(timeForTimer.subtract(1, "s"));
          setDays(timeForTimer.days());
          setHours(timeForTimer.hours());
          setMins(timeForTimer.minutes());
          setSecs(timeForTimer.seconds());
        } else {
          const positionInStream = new Date().getTime() - movieShowtime;
          setUsePoster(false);
          setShouldPlay(true);
          videoRef.current.playFromPositionAsync(positionInStream);
          clearInterval(intervalId);
        }
      }, 1000);
    };

    rotateLandscape();
    enterUserInMovie();

    return (cleanup = async () => {
      await ScreenOrientation.unlockAsync();
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      landscape = false;
    });
  }, [landscape]);

  const headerToggle = () => {
    setHeaderShown(!headerShown);
    navigation.setOptions({
      headerShown: !headerShown,
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => {
            navigation.pop(2);
          }}
        />
      ),
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
        style={{ width: playerWidth, height: playerHeight }}
        ref={videoRef}
        posterSource={{ uri: movie.img }}
        usePoster={usePoster}
      />
      {timeForTimer > 0 && (
        <View style={styles.countdownContainer}>
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.countdownTimerText}>
                {days} {"\n"} Days
              </Text>
              <Text style={styles.countdownTimerText}>
                {hours} {"\n"} Hrs
              </Text>
              <Text style={(style = styles.countdownTimerText)}>
                {mins} {"\n"} Mins
              </Text>
              <Text style={styles.countdownTimerText}>
                {secs} {"\n"} Secs
              </Text>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  countdownContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  countdownTimerText: {
    color: "white",
    backgroundColor: "#7E0808",
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ffffff",
    padding: 5,
    width: 100,
    marginLeft: 15,
    fontSize: 24,
  },
});

export default VideoPlayer;
