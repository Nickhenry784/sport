import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions,
  FlatList, 
  ImageBackground, 
  Image, 
  Alert  } from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const dataSport = [{id: 1, image: images.el1}, {id: 2, image: images.el2},{id: 3, image: images.el3},{id: 4, image: images.el4},{id: 5, image: images.el5},{id: 6, image: images.el6}];
const numCol = 2;

const Home = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const dispatch = useDispatch();
  const [time, setTimme] = useState(Math.floor(10 + Math.random() * 25));
  const [random, setRandom] = useState(false);
  const [randomNum, setRandomNum] = useState(null);


  useEffect(() => {
    const timeOut = setTimeout(() => {
      if(random && time > 0){
        setTimme(time - 1);
        setRandomNum(Math.floor(1 + Math.random() * 5));
      }
      if(random && time === 0){
        setRandom(false);
        setRandomNum(Math.floor(0 + Math.random() * 6));
        setTimme(Math.floor(10 + Math.random() * 25));
        navigation.navigate("Play", {item: dataSport[randomNum] })
      }
    }, 200);
    return () => {
      clearTimeout(timeOut);
    }
  },[time, random]);

  const onClickStartButton = (idx) => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    dispatch(decrement());
    setRandom(true);
  }


  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.buy} style={appStyle.buyImage} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={appStyle.labelText}>Random Movement</Text>
      <FlatList
          data={dataSport} 
          numColumns={numCol}
          scrollEnabled={false}
          renderItem={({item, index}) => 
            <ImageBackground key={item.id} source={images.b} style={itemStyle(index, randomNum)}>
              <Image source={item.image} style={appStyle.backStyle} />
            </ImageBackground>
          }/>
      <TouchableOpacity onPress={() => onClickStartButton()}>
        <Image style={appStyle.centerImage} source={images.spin} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export const itemStyle = (id, index) =>  StyleSheet.create({
  width: windowWidth * 0.3,
  height: windowWidth * 0.3,
  resizeMode: 'contain',
  margin: 10,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: id === index ? 'white' : null,
})


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  attributeView: {
    flex: 0.1,
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  logoImage: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    resizeMode: 'cover',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  appBar: {
    width: '40%',
    position: 'absolute',
    top: '0%',
    right: '0%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  turnView: {
    flexDirection: 'row',
    width: windowWidth * 0.15,
    marginRight: 10,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerImage: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  scoreStyle: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  turnText: {
    fontSize: windowWidth > 640 ? 30 : 25,
    fontWeight: 'bold',
    color: 'white',
  },
  labelText: {
    fontSize: windowWidth > 640 ? 60 : 40,
    color: 'white',
    fontWeight: 'bold',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  centerView: {
    flex: 0.7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bottomView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  createButton: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  backStyle: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
});

export default Home;