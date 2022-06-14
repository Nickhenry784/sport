import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions, 
  ImageBackground,
  Image, 
  TextInput  } from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const Play = ({navigation, route}) => {

  const {item} = route.params;

  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.centerView}>
        <ImageBackground source={images.b} style={appStyle.scoreImage}>
          <Image source={item.image} style={appStyle.centerImage} />
        </ImageBackground>
      </View>
      <View style={appStyle.bottomView}>
        <Text style={appStyle.xtext}>{`You will do the movement ${Math.floor(10 + Math.random() * 15)} times`}</Text>
      </View>
    </ImageBackground>
  );
};


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  centerImage: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    resizeMode: 'contain',
  },
  scoreImage: {
    width: windowWidth * 0.75,
    height: windowWidth * 0.7,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  xtext: {
    fontSize: windowWidth > 640 ? 60 : 40,
    color: 'white',
    fontWeight: 'bold',
  },
  centerView: {
    flex: 0.6,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 30,
  },
  bottomView: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    paddingBottom: 20,
  },
});

export default Play;