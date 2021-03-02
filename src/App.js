import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import EnterMovieScreen from "./screens/EnterMovieScreen";
import MovieScreen from "./screens/MovieScreen";
import ScreenTitles from "./components/common/ScreenTitles";
import SettingsScreen from "./screens/SettingsScreen";

const Stack = createStackNavigator();

function RootStack() {
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
        <Stack.Screen name={ScreenTitles.HomeScreen} component={HomeScreen} />
        <Stack.Screen
          name={ScreenTitles.EnterMovie}
          component={EnterMovieScreen}
        />
        <Stack.Screen
          name={ScreenTitles.MovieScreen}
          component={MovieScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={ScreenTitles.SettingsScreen} component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
