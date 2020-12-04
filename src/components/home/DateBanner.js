import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";

const DateBanner = ({ currentDate, setDate }) => {

  // 2 date variables
  const [dateMinusOne, setDateMinusOne] = useState(moment(currentDate).subtract(1, "day"));
  const [datePlusOne, setDatePlusOne] = useState(moment(currentDate).add(1, "day"));

  // called when hitting left caret icon
  const subtractDays = () => {
    const newCurrentDate = moment(currentDate).subtract(1, "day");
    const newDateMinusOne = moment(dateMinusOne).subtract(1, "day");
    const newDatePlusOne = moment(datePlusOne).subtract(1, "day");

    setDate(newCurrentDate);
    setDateMinusOne(newDateMinusOne);
    setDatePlusOne(newDatePlusOne);
  };

  // called when hitting right caret icon
  const addDays = () => {
    const newCurrentDate = moment(currentDate).add(1, "day");
    const newDateMinusOne = moment(dateMinusOne).add(1, "day");
    const newDatePlusOne = moment(datePlusOne).add(1, "day");

    setDate(newCurrentDate);
    setDateMinusOne(newDateMinusOne);
    setDatePlusOne(newDatePlusOne);
  };

  return (
    <View style={styles.dateBannerContainer}>
      <View>
        <AntDesign
          onPress={subtractDays}
          style={styles.dateIcon}
          name="left"
          size={24}
          color="white"
        />
      </View>
      <View>
        <Text style={styles.dateBannerSideText}>
          {moment(dateMinusOne).format("MMM DD[\n]ddd")}
        </Text>
      </View>
      <View>
        <Text style={styles.dateBannerText}>{moment(currentDate).format("MMM DD[\n]ddd")}</Text>
      </View>
      <View>
        <Text style={styles.dateBannerSideText}>{moment(datePlusOne).format("MMM DD[\n]ddd")}</Text>
      </View>
      <View>
        <AntDesign
          onPress={addDays}
          style={styles.dateIcon}
          name="right"
          size={24}
          color="white"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dateBannerContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-evenly",
  },
  dateBannerText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  dateBannerSideText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});

export default DateBanner;
