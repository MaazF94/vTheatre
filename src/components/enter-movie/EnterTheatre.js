import React from "react";
import SvgComponent from "../../assets/svg/SvgComponent";
import { StyleSheet, View, Text, Image } from "react-native";
// Using this until we pass URI for img
import SelectImage from "../../assets/img/SelectImage";

const EnterTheatre = ({ movie }) => {
  return (
    <View>
      <View style={styles.screen}>
        <SvgComponent />
      </View>
      <Text style={styles.screenText}>SCREEN</Text>
      <View style={styles.imgContainer}>
        {/* Using select image until we load img from URI */}
        <Image style={styles.img} source={SelectImage[movie.id]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  screenText: {
    color: "#FFFFFF",
    fontSize: 12,

    fontWeight: "bold",
    textAlign: "center",
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 132,
    height: 158,
    alignItems: "center",
    marginTop: 40,
  },
});

export default EnterTheatre;
