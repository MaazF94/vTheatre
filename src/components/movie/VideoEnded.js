import React from "react";
import { View, Text, StyleSheet } from "react-native";

const VideoEnded = ({ movieEndedText }) => {
  return (
    <View style={styles.centerContainer}>
      <Text
        style={[styles.movieEndedText, { opacity: movieEndedText.opacity }]}
      >
        Your movie has ended. Thanks for watching on vTheatre!
      </Text>
    </View>
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
  movieEndedText: {
    color: "white",
    backgroundColor: "#7E0808",
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ffffff",
    padding: 5,
    marginLeft: 15,
    fontSize: 24,
  },
});

export default VideoEnded;
