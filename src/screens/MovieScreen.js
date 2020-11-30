import React, { useEffect, useState, useRef } from "react";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { Dimensions, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from '@react-navigation/stack';
import moment from "moment";

const MovieScreen = (props) => {
  const showtime = props.route.params.showtime;
  const [headerShown, setHeaderShown] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const playerHeight = width < height ? width : height;
  const playerWidth = width > height ? width : height;
  let landscape = true;
  const videoRef = useRef();

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    landscape = true;
    const movieShowtime = moment(showtime, "HH:mm a");

    const intervalId = setInterval(() => {
      if (new Date().getTime() >= movieShowtime) {
        setShouldPlay(true);
        const positionInStream = new Date().getTime() - movieShowtime;
        videoRef.current.playFromPositionAsync(positionInStream);
        clearInterval(intervalId);
      }
    }, 1000);

    return function cleanup() {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      landscape = false;
    };
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
      )
    });
  };

  return (
    <View>
      <StatusBar type={"slide"} />
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
        />
      </TouchableOpacity>
    </View>
  );
};

export default MovieScreen;
