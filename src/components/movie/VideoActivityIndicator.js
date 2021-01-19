import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";

const VideoActivityIndicator = ({ activityIndicator }) => {
  return (
    <ActivityIndicator
      animating
      size="large"
      color="#7E0808"
      style={[styles.centerContainer, { opacity: activityIndicator.opacity }]}
    />
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VideoActivityIndicator;
