import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";

const DateBanner = ({
  selectedDate,
  setSelectedDate,
  showDatePicker,
  setShowDatePicker,
}) => {
  // 2 date variables
  const [dateMinusOne, setDateMinusOne] = useState(
    moment(selectedDate).subtract(1, "day")
  );
  const [datePlusOne, setDatePlusOne] = useState(
    moment(selectedDate).add(1, "day")
  );
  const [showPreviousDate, setShowPreviousDate] = useState(true);

  useEffect(() => {
    HideIfToday();
  }, [selectedDate, dateMinusOne, datePlusOne]);

  // called when hitting left caret icon
  const subtractDays = () => {
    const newCurrentDate = moment(selectedDate).subtract(1, "day");
    const newDateMinusOne = moment(dateMinusOne).subtract(1, "day");
    const newDatePlusOne = moment(datePlusOne).subtract(1, "day");

    setSelectedDate(newCurrentDate);
    setDateMinusOne(newDateMinusOne);
    setDatePlusOne(newDatePlusOne);
  };

  // called when hitting right caret icon
  const addDays = () => {
    const newCurrentDate = moment(selectedDate).add(1, "day");
    const newDateMinusOne = moment(dateMinusOne).add(1, "day");
    const newDatePlusOne = moment(datePlusOne).add(1, "day");

    setSelectedDate(newCurrentDate);
    setDateMinusOne(newDateMinusOne);
    setDatePlusOne(newDatePlusOne);
  };

  // cannot see list of movies before today's date
  const HideIfToday = () => {
    if (
      moment(selectedDate).format("MM/DD/YYYY") ===
      moment(new Date()).format("MM/DD/YYYY")
    ) {
      setShowPreviousDate(false);
    } else {
      if (showPreviousDate === false) {
        setShowPreviousDate(true);
      }
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.dateBannerContainer}>
        <View>
          {showPreviousDate && (
            <AntDesign
              onPress={subtractDays}
              name="left"
              size={24}
              color="white"
            />
          )}
        </View>
        <View>
          {showPreviousDate && (
            <TouchableOpacity onPress={subtractDays}>
              <Text style={styles.dateBannerSideText}>
                {moment(dateMinusOne).format("MMM DD[\n]ddd")}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View>
          <Text style={styles.dateBannerText}>
            {moment(selectedDate).format("MMM DD[\n]ddd")}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={addDays}>
            <Text style={styles.dateBannerSideText}>
              {moment(datePlusOne).format("MMM DD[\n]ddd")}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <AntDesign onPress={addDays} name="right" size={24} color="white" />
        </View>
      </View>
      <View style={styles.dateBannerContainer}>
        <TouchableOpacity onPress={showDatepicker} style={styles.dateBtn}>
          <Text style={styles.selectDateBtnText}>Select Future Date</Text>
        </TouchableOpacity>
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
  dateBtn: {
    backgroundColor: "#7E0808",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  selectDateBtnText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default DateBanner;
