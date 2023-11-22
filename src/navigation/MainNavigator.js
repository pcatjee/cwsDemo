import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../screens/Home';
import DetailsScreen from './DetailsScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />

      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

const DrawerStack = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen name="AppStack" component={AppStack} />
    </Drawer.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <DrawerStack />
    </NavigationContainer>
  );
};

export default MainNavigator;
