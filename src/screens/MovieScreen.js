import React, { useEffect } from "react";
import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import * as ScreenOrientation from 'expo-screen-orientation';

const MovieScreen = () => {

  // useEffect(() => {
  //   ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

  //   return function cleanup() {
  //     ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  //   }
  // });

  return (
    <VideoPlayer
      videoProps={{
        shouldPlay: true,
        resizeMode: Video.RESIZE_MODE_CONTAIN,
        // useNativeControls: true,
        source: {
          uri:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        },
      }}
      // inFullscreen={true}
    />
  );
};

export default MovieScreen;
