import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, StyleSheet, Text, View } from "react-native";


const width = Dimensions.get("screen").width ;
const height = Dimensions.get("screen").height ;
const Profile = () => {
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
            width: width-50,
            height: height-350,
            transform: [{ rotate: spin }],
          }}
          source={{uri: "https://img.freepik.com/premium-vector/food-delivery-service-fast-food-delivery-scooter-delivery-service-illustration_67394-869.jpg"}}
        />
      </View>
    </>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Profile;
