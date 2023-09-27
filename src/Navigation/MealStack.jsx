import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text } from "react-native";
import Meal from "./Screens/Meal";
import SubsDetails from "../SubsDetails";
import Customization from "../Customization";
import OTP from "../OTP";
import Address from "../Address";
import Details from "../Details";


import Payment from "../Payment";


const Stack = createStackNavigator();
const MealStack = () => {
  return (
    <>
      <Stack.Navigator>
     
        <Stack.Screen
          name="Meal planes"
          component={Meal}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Details" component={SubsDetails}/>
        <Stack.Screen name="Customization" component={Customization} />
        <Stack.Screen name="otp" component={OTP} />
        <Stack.Screen name="Address" component={Address}  />
        <Stack.Screen name="AllDetails" component={Details} />
        <Stack.Screen name="Payment" component={Payment}/>
      </Stack.Navigator>
    </>
  );
};

export default MealStack;
