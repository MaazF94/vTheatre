import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import EnterMovieScreen from "./screens/EnterMovieScreen";
import MovieScreen from "./screens/MovieScreen";
import ScreenTitles from "./components/common/ScreenTitles";

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
        }}
      >
        <Stack.Screen name={ScreenTitles.HomeScreen} component={HomeScreen} />
        <Stack.Screen name={ScreenTitles.EnterMovie} component={EnterMovieScreen} />
        <Stack.Screen name={ScreenTitles.MovieScreen} component={MovieScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
