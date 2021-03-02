import React, { useEffect } from "react";
import {
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import EnterTheatre from "../components/enter-movie/EnterTheatre";

const SettingsScreen = () => {
  const isFocused = useIsFocused();

  useEffect(() => {
    const rotateLandscape = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };

    if (isFocused) {
      rotateLandscape();
    }
  }, [isFocused]);

  const openPrivacyPolicy = () => {
    Linking.openURL("https://www.vtheatres.com");
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#343434" />
      <View style={{ flex: 1 }}>
        <EnterTheatre img="https://d2jd6aahs7xcv2.cloudfront.net/Icon.jpg" />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.confirmationContainer}>
            <Text style={styles.header}>Need more info?</Text>
            <Collapse style={styles.collapsibleContainer}>
              <CollapseHeader>
                <View>
                  <Text style={styles.collapsibleTitle}>Privacy Policy</Text>
                </View>
              </CollapseHeader>
              <CollapseBody style={styles.collapsibleBodyContainer}>
                <TouchableOpacity onPress={openPrivacyPolicy}>
                  <Text style={styles.collapsibleBody}>
                    vTheatre is committed to protecting your privacy. To view
                    our privacy policy, please visit
                    https://www.vtheatres.com/privacy-policy
                  </Text>
                </TouchableOpacity>
              </CollapseBody>
            </Collapse>
            <Collapse style={styles.collapsibleContainer}>
              <CollapseHeader>
                <View>
                  <Text style={styles.collapsibleTitle}>Support</Text>
                </View>
              </CollapseHeader>
              <CollapseBody style={styles.collapsibleBodyContainer}>
                <Text style={styles.collapsibleBody}>
                  For information, support, or other inquiries, please email
                  vtheatreofficial@gmail.com
                </Text>
              </CollapseBody>
            </Collapse>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  confirmationContainer: {
    flexDirection: "column",
    backgroundColor: "#272727",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 40,
    height: "100%",
  },
  header: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  collapsibleTitle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  collapsibleBody: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  collapsibleContainer: {
    marginTop: 20,
  },
  collapsibleBodyContainer: {
    marginTop: 10,
  },
});

export default SettingsScreen;
