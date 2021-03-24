import React from "react";
import { View, StyleSheet } from "react-native";
import TimeBanner from "../enter-movie/TimeBanner";
import DateBanner from "../home/DateBanner";

const BannerBackground = (props) => {
  const {
    isDateBanner,
    isTimeBanner,
    selectedDate,
    setSelectedDate,
    selectedShowtimeObj,
    showDatePicker,
    setShowDatePicker,
  } = props;

  const GetBannerContent = () => {
    if (isDateBanner) {
      return (
        <DateBanner
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
        />
      );
    } else if (isTimeBanner) {
      return <TimeBanner selectedShowtimeObj={selectedShowtimeObj} />;
    }
  };

  return (
    <View
      style={{
        height: isDateBanner ? 125 : 75,
        backgroundColor: "#7E0808",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <GetBannerContent />
    </View>
  );
};

export default BannerBackground;
