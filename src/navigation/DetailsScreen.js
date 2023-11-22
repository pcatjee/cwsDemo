import {View, Text} from 'react-native';
import React from 'react';

const DetailsScreen = ({route}) => {
  const item = route.params;
  return (
    <View>
      <Text>DetailsScreen</Text>
    </View>
  );
};

export default DetailsScreen;
