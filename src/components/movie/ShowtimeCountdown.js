import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ShowtimeCountdown = ({ movieStarted, days, hours, mins, secs }) => {
  return (
    <View style={styles.centerContainer}>
      {!movieStarted && (
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
      )}
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

export default ShowtimeCountdown;
