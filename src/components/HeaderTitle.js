import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <View>
          <Text style={styles.header}>vTheatre</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: "#343434",
  },
  header: {
    fontSize: 24,
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 14,
    marginTop: 14,
  }
});

export default Header;
