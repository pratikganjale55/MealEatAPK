import React, {useRef, useState, useEffect, useContext} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
  Easing,
  spring,
  ScrollView
} from 'react-native';

import {Card} from 'react-native-paper';
import { MealContext } from './Context/ContextProvider';
const {width} = Dimensions.get('window');

export default function CircleExpander() {
  const [isCircle, setIsCircle] = useState(true);
 const {toggleValue} = useContext(MealContext)
  const animationValue = useRef(new Animated.Value(0)).current;

  const {t} = useTranslation() ;

  const openSurroundingCircles = () => {
    animationValue.setValue(0);
    Animated.spring(animationValue, {
      toValue: 1,
      damping: 4,
      stiffness: 60,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
    setIsCircle(true);
  };

  const closeSurroundingCircles = () => {
    Animated.timing(animationValue, {
      toValue: 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
    setIsCircle(false);
  };
  const handleClick = num => {
    setIsCircle(!isCircle);
    // alert(`${num} clicked`);
  };

  useEffect(() => {
    openSurroundingCircles();
  }, []);
  return (
    <View style={styles.container}>
      {/* <View style={styles.btnContainer}> */}
      {isCircle && (
        <View style={styles.btnContainerMiddle}>
          <Animated.View
            style={[
              {
                transform: [
                  {
                    scale: animationValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                ],
              },
            ]}>
            <TouchableOpacity
              onPress={() => handleClick(1)}
              style={[
                styles.button,
                {position: 'absolute', left: -115, top: 50},
              ]}>
              <Image
                source={{uri : "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=600"}}
                style={[styles.button, {opacity: 0.5}]}
              />
              <View style={styles.textContainer}>
                <Text style={styles.buttonText}>{toggleValue ? t("LITE ROTI CHICKEN") : "LITE ROTI CHICKEN"}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleClick(2)}
              style={[styles.button]}>
              <Image
                source={{uri : "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=600"}}
                style={[styles.button, {opacity: 0.5}]}
              />
              <View style={styles.textContainer}>
                <Text style={styles.buttonText}>{toggleValue ? t("LITE ROTI MEAL") : "LITE ROTI MEAL"}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleClick(3)}
              style={[
                styles.button,
                {position: 'absolute', left: 115, top: 60},
              ]}>
              <Image
                source={{uri : "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=600"}}
                style={[styles.button, {opacity: 0.5}]}
              />
              <View style={styles.textContainer}>
                <Text style={styles.buttonText}>{toggleValue ? t("LITE ROTI VEG") : "LITE ROTI VEG"}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}

      <View style={[styles.btnContainerMiddle, {justifyContent: 'center'}]}>
        <TouchableOpacity
          onPress={isCircle ? closeSurroundingCircles : openSurroundingCircles}
          style={[
            styles.button,
            {height: 110, width: 110, borderRadius: 60, margin: 10},
          ]}>
          <Image
            source={{uri : "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=600"}}
            style={[styles.button, {opacity: 0.5}]}
          />
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>{toggleValue ? t("MEALS") : "MEALS"}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {isCircle && (
        <View style={styles.btnContainerMiddle}>
          <Animated.View
            style={[
              {
                transform: [
                  {
                    scale: animationValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                ],
              },
            ]}>
            <TouchableOpacity
              onPress={() => handleClick(5)}
              style={[
                styles.button,
                {position: 'absolute', left: -115, bottom: 80},
              ]}>
              <Image
                source={{uri : "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=600"}}
                style={[styles.button, {opacity: 0.5}]}
              />
              <View style={styles.textContainer}>
                <Text style={styles.buttonText}>{toggleValue ? t("STD CHICKEN THALI") : "STD CHICKEN THALI"}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleClick(6)}
              style={[styles.button]}>
              <Image
                source={{uri : "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=600"}}
                style={[styles.button, {opacity: 0.5}]}
              />
              <View style={styles.textContainer}>
                <Text style={styles.buttonText}>{toggleValue ? t("ROTI PANEER MEAL") : "ROTI PANEER MEAL"}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleClick(7)}
              style={[
                styles.button,
                {position: 'absolute', right: -115, bottom: 70},
              ]}>
              <Image
                source={{uri : "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=600"}}
                style={[styles.button, {opacity: 0.5}]}
              />
              <View style={styles.textContainer}>
                <Text style={styles.buttonText}>{toggleValue ? t("ROTI PANEER RICE") : "ROTI PANEER RICE"}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
      {/* </View>  */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    justifyContent: 'center',
    backgroundColor: 'grey',
    padding: 8,
    width: width - 20,
    height: 400,
    borderRadius: 100,
    alignItems: 'center',
  },
  btnContainerMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    margin: 10,
    width: 120,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ff6b01',
    borderWidth: 3,
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    // color : "white" ,
  },
});
