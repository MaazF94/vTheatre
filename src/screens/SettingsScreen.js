import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import EnterTheatre from "../components/enter-movie/EnterTheatre";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import ScreenTitles from "../components/common/ScreenTitles";
import AlertMessages from "../components/common/AlertMessages";
import StorageConstants from "../components/common/StorageConstants";
import moment from "moment";
import { useEffect } from "react";
import Api from "../api/Api";
import UriConstants from "../api/UriConstants";
import HttpHeaders from "../components/common/HttpHeaders";
import { useIsFocused } from "@react-navigation/native";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [myTickets, setMyTickets] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getTickets();
    }
  }, [isFocused]);

  const getTickets = async () => {
    const value = await AsyncStorage.getItem(StorageConstants.Username);
    const myTicketsRequest = {
      username: value,
    };
    const myTickets = await Api.post(
      UriConstants.getTickets,
      myTicketsRequest,
      {
        headers: HttpHeaders.headers,
      }
    );
    setMyTickets(myTickets.data);
  };

  const removeData = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // error removing data
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      removeData();
      navigation.navigate(ScreenTitles.AuthScreen);
    } catch (error) {
      Alert.alert(AlertMessages.ErrorTitle, AlertMessages.ErrorMsg);
    }
  };

  const openPrivacyPolicy = () => {
    Linking.openURL("https://www.vtheatres.com/privacy-policy");
  };

  const renderRow = (data) => {
    return (
      <View key={data.title + data.showtime + data.chosenDate}>
        <View
          style={{
            borderColor: "white",
            borderWidth: 1,
            marginTop: 20,
            padding: 20,
          }}
        >
          <Text style={styles.ticketText}>{data.title}</Text>
          <Text style={styles.ticketText}>
            {moment(new Date(data.chosenDate)).format("dddd, MMMM DD, YYYY")}
          </Text>
          <Text style={styles.ticketText}>{data.showtime}</Text>
        </View>
      </View>
    );
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
                  <Text style={styles.collapsibleTitle}>Purchased Tickets</Text>
                </View>
              </CollapseHeader>
              <CollapseBody style={styles.collapsibleBodyContainer}>
                {myTickets !== null &&
                  myTickets.map((myTicket) => {
                    // This will render a row for each data element.
                    return renderRow(myTicket);
                  })}
              </CollapseBody>
            </Collapse>
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
            <TouchableOpacity onPress={signOut} style={styles.signMeUpBtn}>
              <Text style={styles.logOutBtnText}>Log out</Text>
            </TouchableOpacity>
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
    alignItems: "center",
  },
  purchasedTickets: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 20,
  },
  textTicketTitle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 5,
  },
  ticketText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
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
    textDecorationLine: "underline",
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
  signMeUpBtn: {
    backgroundColor: "#7E0808",
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width / 4,
    height: 35,
    marginTop: 30,
  },
  logOutBtnText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SettingsScreen;
