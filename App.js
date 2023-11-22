import {View, Text} from 'react-native';
import React from 'react';
import MainNavigator from './src/navigation/MainNavigator';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import OnBoardScreen from './src/screens/OnBoardScreen';

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
