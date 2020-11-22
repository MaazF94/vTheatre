import React from "react";
import { View, StyleSheet } from "react-native";
import TimeBanner from "../enter-movie/TimeBanner";
import DateBanner from "../home/DateBanner";

const BannerBackground = (props) => {
  function GetBannerContent() {
    if (props.isDateBanner) {
      return (
        <DateBanner currentDate={props.currentDate} setDate={props.setDate} />
      );
    } else if (props.isTimeBanner) {
      return <TimeBanner showtime={props.showtime} />;
    }
  }

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
