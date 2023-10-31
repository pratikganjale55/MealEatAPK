import {Button, Card} from '@rneui/themed';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MealContext} from './Context/ContextProvider';
import {useTranslation} from 'react-i18next'; 

const CustomeDetails = ({navigation}) => {
  const {detailsData, addCstmFood, handleCstmConfirmProceed,toggleValue, setAddCstmFood} =
    useContext(MealContext);
  const [cstmTotal, setCstmTotal] = useState();
  const {t} = useTranslation() ;
  // console.log('addCstmFood', addCstmFood);

  const calculationOfCstmMeal = addCstmFood1 => {
    // console.log('data from Custome Meal Details', addCstmFood);
    let totalPrice = 0;
    for (let foodItem in addCstmFood1) {
      console.log("addCstmFood1", addCstmFood1)
      if (addCstmFood1.hasOwnProperty(foodItem)) {
        if (foodItem !== "cstmFoodDate" && foodItem !== "cstmPlaneId") {
          const [foodName, priceString] = foodItem.split(' (Rs ');
          const price = parseFloat(priceString?.replace(')', ''));
          const quantity = addCstmFood1[foodItem];
          const subTotal = price * quantity;
          console.log(foodName, price, quantity);
          totalPrice += subTotal;
        }
        
      }
    }
    console.log("addCstmFood", addCstmFood1)
    setCstmTotal(totalPrice);
   
    // setAddCstmFood({addCstmFood ,totalPrice})
    
  };

  useEffect(() => {
    calculationOfCstmMeal(detailsData.addCstmFood);
    // console.log('details page', detailsData);
  }, []);
  return (
    <>
      <Card>
        <Card.Title>{toggleValue ? t("Customization Item") : "Custome Meal Details"}</Card.Title>
        <Card.Divider />
        <View style={Styles.rowOrder}>
          <Text>{toggleValue ? t("Meal Type") : "Meal Type"} :</Text>
          <Text style={Styles.detailsText}>{detailsData.mealType}</Text>
        </View>
        <View style={Styles.rowOrder}>
          <Text>{toggleValue ? t("Gravy (Rs 30)") : "Gravy (Rs 30)"} :</Text>
          <Text style={Styles.detailsText}>
            {detailsData && detailsData.addCstmFood['Gravy (Rs 30)']}
          </Text>
        </View>
        <View style={Styles.rowOrder}>
          <Text>{toggleValue ? t("Rice (Rs 35)") : "Rice (Rs 35)"} :</Text>
          <Text style={Styles.detailsText}>
            {detailsData && detailsData.addCstmFood['Rice (Rs 35)']}
          </Text>
        </View>
        <View style={Styles.rowOrder}>
          <Text>{toggleValue ? t("Roti (Rs 9)") : "Roti (Rs 9)"} :</Text>
          <Text style={Styles.detailsText}>
            {detailsData && detailsData.addCstmFood['Roti (Rs 9)']}
          </Text>
        </View>
        <View style={Styles.rowOrder}>
          <Text>{toggleValue ? t("Sweet (Rs 35)") : "Sweet (Rs 35)"} :</Text>
          <Text style={Styles.detailsText}>
            {detailsData && detailsData.addCstmFood['Sweet (Rs 35)']}
          </Text>
        </View>
        <View style={Styles.rowOrder}>
          <Text>{toggleValue ? t("Date") : "Date"} :</Text>
          <Text style={Styles.detailsText}>{addCstmFood['cstmFoodDate']}</Text>
        </View>
        <View style={Styles.rowOrder}>
          <Text>{toggleValue ? t("Total") : "Total"} :</Text>
          <Text style={[Styles.detailsText, Styles.cstmTotalPrice]}>
            ₹ {cstmTotal}
          </Text>
        </View>
        <View style={Styles.CstmConfirmBtn}>
          <Button
            title={toggleValue ? t("Proceed") :"Confirm & Proceed" }
            buttonStyle={{
              backgroundColor: '#ff6b01',
              borderRadius: 30,
            }}
            containerStyle={{
              width: 200,
            }}
            titleStyle={{fontWeight: 'bold'}}
            onPress={() => handleCstmConfirmProceed(navigation, cstmTotal)}
          />
        </View>
      </Card>
    </>
  );
};

const Styles = StyleSheet.create({
  detailsText: {
    fondSize: 18,
    color: 'black',
  },
  rowOrder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  detailsPriceText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  detailsConfirmBtn: {
    alignItems: 'center',
  },
  cstmTotalPrice: {
    fontSize: 20,
  },
  CstmConfirmBtn: {
    alignItems: 'center',
  },
});

export default CustomeDetails;
