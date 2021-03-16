import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import EnterMovieScreen from "./screens/EnterMovieScreen";
import MovieScreen from "./screens/MovieScreen";
import ScreenTitles from "./components/common/ScreenTitles";
import SettingsScreen from "./screens/SettingsScreen";
import Amplify from "aws-amplify";
import AuthScreen from "./screens/AuthScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageConstants from "./components/common/StorageConstants";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import PurchaseTicketScreen from "./screens/PurchaseTicketScreen";
import { HeaderBackButton } from "react-navigation-stack";

const RootStack = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const Stack = createStackNavigator();

  Amplify.configure({
    Auth: {
      region: "us-east-2",
      userPoolId: "us-east-2_pJhh6KuVF",
      userPoolWebClientId: "51eavns55m3vmfoh54ob027ebs",
    },
  });

  useEffect(() => {
    getData();
  }, [isUserLoggedIn]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(StorageConstants.Username);
      if (value !== null) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    } catch (e) {
      // error reading value
    }
  };

  const ChooseNavigationStack = () => {
    if (isUserLoggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={ScreenTitles.HomeScreen}
            screenOptions={{
              headerStyle: {
                backgroundColor: "#343434",
              },
              cardStyle: {
                backgroundColor: "#343434",
              },
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 24,
                color: "#FFFFFF",
              },
              animationEnabled: false,
            }}
          >
            <Stack.Screen
              name={ScreenTitles.AuthScreen}
              component={AuthScreen}
            />
            <Stack.Screen
              name={ScreenTitles.HomeScreen}
              component={HomeScreen}
            />
            <Stack.Screen
              name={ScreenTitles.EnterMovie}
              component={EnterMovieScreen}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <HeaderBackButton
                    onPress={() => navigation.navigate(ScreenTitles.HomeScreen)}
                  />
                ),
              })}
            />
            <Stack.Screen
              name={ScreenTitles.MovieScreen}
              component={MovieScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ScreenTitles.SettingsScreen}
              component={SettingsScreen}
            />
            <Stack.Screen
              name={ScreenTitles.ForgotPassword}
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name={ScreenTitles.PurchaseTicket}
              component={PurchaseTicketScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={ScreenTitles.AuthScreen}
            screenOptions={{
              headerStyle: {
                backgroundColor: "#343434",
              },
              cardStyle: {
                backgroundColor: "#343434",
              },
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 24,
                color: "#FFFFFF",
              },
              animationEnabled: false,
            }}
          >
            <Stack.Screen
              name={ScreenTitles.AuthScreen}
              component={AuthScreen}
            />
            <Stack.Screen
              name={ScreenTitles.HomeScreen}
              component={HomeScreen}
            />
            <Stack.Screen
              name={ScreenTitles.EnterMovie}
              component={EnterMovieScreen}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <HeaderBackButton
                    onPress={() => navigation.navigate(ScreenTitles.HomeScreen)}
                  />
                ),
              })}
            />
            <Stack.Screen
              name={ScreenTitles.MovieScreen}
              component={MovieScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ScreenTitles.SettingsScreen}
              component={SettingsScreen}
            />
            <Stack.Screen
              name={ScreenTitles.ForgotPassword}
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name={ScreenTitles.PurchaseTicket}
              component={PurchaseTicketScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  };

  return <ChooseNavigationStack />;
};

export default RootStack;
