import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, StyleSheet, Text, View } from "react-native";


const width = Dimensions.get("screen").width ;
const height = Dimensions.get("screen").height ;
const SplashScreen = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  const rotateAnimated = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  useEffect(() => {
    rotateAnimated();
  }, []);
  return (
    <>
      <View style={style.container}>
        <Animated.Image
          style={{
            width: width-40,
            height: height-350,
            transform: [{ rotate: spin }],

          }}
          source={{uri: "https://cdn.vectorstock.com/i/preview-1x/82/62/food-restaurant-icon-logo-vector-4998262.webp"}}
        />
      </View>
    </>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    width : width ,
    height : height ,
    backgroundColor : "white" ,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default SplashScreen;
