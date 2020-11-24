import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const DateBanner = ({ currentDate, setDate }) => {
  const weekDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date();

  // 2 date variables
  const [dateMinusOne, setDateMinusOne] = useState(
    new Date(date.setDate(currentDate.getDate() - 1))
  );
  const [datePlusOne, setDatePlusOne] = useState(
    new Date(date.setDate(currentDate.getDate() + 1))
  );

  // called when hitting left caret icon
  const subtractDays = () => {
    const newCurrentDate = new Date(
      currentDate.setDate(currentDate.getDate() - 1)
    );
    const newDateMinusOne = new Date(
      dateMinusOne.setDate(dateMinusOne.getDate() - 1)
    );
    const newDatePlusOne = new Date(
      datePlusOne.setDate(datePlusOne.getDate() - 1)
    );
    setDate(newCurrentDate);
    setDateMinusOne(newDateMinusOne);
    setDatePlusOne(newDatePlusOne);
  };

  // called when hitting right caret icon
  const addDays = () => {
    const newCurrentDate = new Date(
      currentDate.setDate(currentDate.getDate() + 1)
    );
    const newDateMinusOne = new Date(
      dateMinusOne.setDate(dateMinusOne.getDate() + 1)
    );
    const newDatePlusOne = new Date(
      datePlusOne.setDate(datePlusOne.getDate() + 1)
    );
    setDate(newCurrentDate);
    setDateMinusOne(newDateMinusOne);
    setDatePlusOne(newDatePlusOne);
  };

  // format the three dates that are shown in the banner
  const formatDate = (date) => {
    let dayOfMonth = date.getDate();
    if (dayOfMonth < 10) {
      dayOfMonth = "0" + dayOfMonth;
    }
    return (
      monthNames[date.getMonth()] +
      " " +
      dayOfMonth +
      "\n" +
      weekDayNames[date.getDay()]
    );
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
          {formatDate(dateMinusOne)}
        </Text>
      </View>
      <View>
        <Text style={styles.dateBannerText}>{formatDate(currentDate)}</Text>
      </View>
      <View>
        <Text style={styles.dateBannerSideText}>{formatDate(datePlusOne)}</Text>
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
