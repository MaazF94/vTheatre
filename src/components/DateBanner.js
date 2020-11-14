import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const DateBanner = () => {
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

  // 3 date variables
  const [currentDate, setDate] = useState(new Date());
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
    <View style={styles.dateBanner}>
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
  dateBanner: {
    backgroundColor: "#7E0808",
    height: 75,
    flexDirection: "row",
  },
  dateBannerText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginTop: 14,
    marginLeft: 22,
    marginRight: 22,
    textAlign: "center",
  },
  dateBannerSideText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "100",
    marginTop: 14,
    marginLeft: 20,
    marginRight: 20,
    textAlign: "center",
    textShadowColor: "#6e706f",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  dateIcon: {
    marginTop: 21,
    marginLeft: 22,
    marginRight: 22,
  },
});

export default DateBanner;
