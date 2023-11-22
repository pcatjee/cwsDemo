import {View, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainNavigator from './src/navigation/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {colors} from './src/constants/Theme';
import Home from './src/screens/Home';
import DetailsScreen from './src/navigation/DetailsScreen';
import OnBoardScreen from './src/screens/OnBoardScreen';
import LoginPage from './src/screens/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from './src/screens/Splash';

const Stack = createNativeStackNavigator();

const App = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkAuthenticationStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      }
    };

    checkAuthenticationStatus();
  });
  {
    console.log('isloggedin?', isLoggedIn);
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
