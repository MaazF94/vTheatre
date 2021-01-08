import React from "react";
import { View, StyleSheet } from "react-native";
import TimeBanner from "../enter-movie/TimeBanner";
import DateBanner from "../home/DateBanner";

const BannerBackground = (props) => {

  const {isDateBanner, isTimeBanner, selectedDate, setSelectedDate, selectedShowtimeObj } = props;
  
  const GetBannerContent = () => {
    if (isDateBanner) {
      return (
        <DateBanner selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      );
    } else if (isTimeBanner) {
      return <TimeBanner selectedShowtimeObj={selectedShowtimeObj} />;
    }
  };

  return (
    <View style={styles.dateBannerBackground}>
      <GetBannerContent />
    </View>
  );
};

const styles = StyleSheet.create({
  dateBannerBackground: {
    backgroundColor: "#7E0808",
    height: 75,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default BannerBackground;
