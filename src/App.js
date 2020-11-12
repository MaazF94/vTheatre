import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import SecondScreen from './screens/SecondScreen';

const Navigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      initialRouteName: "Home",
      defaultNavigationOptions: {
        title: "App",
      },
      navigationOptions: {
        headerShown: false
      }
    },
    Second: {
      screen: SecondScreen
    }
  }
);

export default createAppContainer(Navigator);
