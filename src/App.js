import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import EnterMovieScreen from "./screens/EnterMovieScreen";
import MovieScreen from "./screens/MovieScreen";

const Stack = createStackNavigator();

function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="vTheatre"
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
        <Stack.Screen name="vTheatre" component={HomeScreen} />
        <Stack.Screen name="Enter Movie" component={EnterMovieScreen} />
        <Stack.Screen name="Showing" component={MovieScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
