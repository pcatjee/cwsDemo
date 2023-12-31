import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Image, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../constants/Theme';
import {PrimaryButton} from '../components/Button';

const OnBoardScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={{height: 400}}>
        <Image
          style={{
            width: '100%',
            resizeMode: 'contain',
            top: -150,
          }}
          source={require('../assets/images/onboardImage.png')}
        />
      </View>
      <View style={style.textContainer}>
        <View>
          <Text style={{fontSize: 32, fontWeight: 'bold', textAlign: 'center'}}>
            Daily Mart
          </Text>
          <Text
            style={{
              marginTop: 20,
              fontSize: 18,
              textAlign: 'center',
              color: colors.grey,
            }}>
            We help you to find best and affordable services
          </Text>
        </View>
        <View style={style.indicatorContainer}>
          <View style={style.currentIndicator} />
          <View style={style.indicator} />
          <View style={style.indicator} />
        </View>
        <PrimaryButton
          onPress={() => navigation.navigate('Login')}
          title="Sign In"
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  indicatorContainer: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentIndicator: {
    height: 12,
    width: 30,
    borderRadius: 10,
    backgroundColor: colors.green,
    marginHorizontal: 5,
  },
  indicator: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: colors.grey,
    marginHorizontal: 5,
  },
});

export default OnBoardScreen;
