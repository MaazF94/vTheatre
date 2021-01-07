import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TimeBanner = ({ selectedShowtimeObj }) => {
  return (
    <View style={styles.timeBanner}>
      <Text style={styles.timeBannerText}>{selectedShowtimeObj.showtime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timeBannerText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  timeBanner: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default TimeBanner;
