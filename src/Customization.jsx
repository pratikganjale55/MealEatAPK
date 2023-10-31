import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import customizationData from "../assets/data/custimization";
import { Card } from "@rneui/base";
import CustomeFoodCard from "./SubComponent/CustomeFoodCard";
import { MealContext } from "./Context/ContextProvider";
import { Button } from "@rneui/themed";
import arCustomization from "../assets/data/arCustomization";
import { useTranslation } from 'react-i18next'; 

const Customization = ({navigation}) => {
  const { custmFoodObj, setCustmFoodObj, handleConfirmCustome, toggleValue } = useContext(MealContext);
  // const [isBtnVisible, setIsBtnVisible] = useState(false)
  const {t} = useTranslation() ;

  const sumOfValues = Object.values(custmFoodObj).reduce((acc, val) => acc+val, 0)
  const isBtnVisible =  sumOfValues > 0 ;
  const handleIncrementCustome = (food) => {
    setCustmFoodObj((prev) => ({
      ...prev,
      [food]: (prev[food] || 0) + 1,
    }));
    // setIsBtnVisible(true)
  };
  const handleDecrementCustome = (food) => {
    setCustmFoodObj((prev) => ({
      ...prev,
      [food]: (prev[food] || 0) - 1,
    }));
    
  };
  // console.log("custmFoodObj >>",custmFoodObj );
  return (
    <>
      <ScrollView>
        <Text style={styles.customeText}>{toggleValue ? t("Customization Item") : "Customization Item"}</Text>
        {(toggleValue ? arCustomization : customizationData).map((item, i) => (
          <CustomeFoodCard
            handleIncrementCustome={handleIncrementCustome}
            handleDecrementCustome={handleDecrementCustome}
            item={item}
            i={i}
            custmFoodObj = {custmFoodObj}
          />
        ))}
         <View style={styles.confirmBtn}>
         <Button
            title={toggleValue ? t("Confirm") : "Confirm"}
            buttonStyle={{
              backgroundColor: "#ff6b01",
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 30,
            }}
            containerStyle={{
              width: 200,
              marginHorizontal: 60,
              marginVertical: 20,
            }}
            titleStyle={{ fontWeight: "bold" }}
            onPress={() => handleConfirmCustome(navigation)}
            disabled= {!isBtnVisible}
          />
          </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  customeText: {
    padding: 10,
    textAlign: "center",
    color: "grey",
    fontSize: 16,
  },
  confirmBtn : {
    alignItems : "center" ,
  }
});
export default Customization;
