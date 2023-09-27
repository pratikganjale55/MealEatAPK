import {Button, Card} from '@rneui/themed';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MealContext} from './Context/ContextProvider';
import StepIndicatorCom from './StepIndicatorCom';
import { ScrollView } from 'react-native-gesture-handler';

const Details = ({navigation}) => {
  const {
    detailsData,
    setUserSubscriptionData,
    userSubscriptionsData,
    customePrice,
    setCustomePrice,
    setSubIdDB,
    setPosition,
    subIdFromDB
  } = useContext(MealContext);

  console.log("detailsData",detailsData );

  const calculateTotalPrice = custmFoodObj => {
    let totalPrice = 0;
    for (let foodItem in custmFoodObj) {
      if (custmFoodObj.hasOwnProperty(foodItem)) {
        const [foodName, priceString] = foodItem.split(' (Rs ');
        const price = parseFloat(priceString.replace(')', ''));
        const quantity = custmFoodObj[foodItem];
        // console.log(foodName,priceString )

        const subTotal = price * quantity;
        // console.log(foodName, price, quantity);
        totalPrice += subTotal;
      }
    }
    setCustomePrice(totalPrice);
  };

  const handleSubmitAllDetails = async () => {
    setUserSubscriptionData({...userSubscriptionsData, detailsData});
   
   console.log(detailsData)
    try {
     const res = await fetch("https://weak-gray-drill-yoke.cyclic.cloud/userSubscriptionsData",{
        method : "POST" ,
        headers : {
          "Content-Type" : "application/json",
        },
        body :JSON.stringify(detailsData)
      })
      const data = await res.json() ;
      console.log("data", data)
      setSubIdDB(data.id)
      setPosition(1)
      navigation.navigate("Address")
      // console.log("repoonse while post user data", data)
    } catch (error) {
      console.log('post user subs details', error);
      navigation.navigate("Address")
    }
  };
  useEffect(() => {
    calculateTotalPrice(detailsData.custmFoodObj);
  }, []);
  console.log(customePrice);
  return (
    <>
    <StepIndicatorCom/>
    <ScrollView>
      <Card>
        <Card.Title>Order Details</Card.Title>
        <Card.Divider />
        <View style={Styles.rowOrder}>
          <Text>Meal Type :</Text>
          <Text style={Styles.detailsText}>{detailsData.mealType}</Text>
        </View>
        <View style={Styles.rowOrder}>
          <Text>Plane : </Text>
          <Text style={Styles.detailsText}>
            {detailsData.subsPlaneId == 1
              ? 'Monthly'
              : detailsData.subsPlaneId == 2
              ? 'Weekly'
              : 'Trial'}
          </Text>
        </View>
        <View style={Styles.rowOrder}>
          <Text>Tittle : </Text>
          <Text style={[Styles.detailsText, {textAlign: 'right'}]}>
            {detailsData.title}
          </Text>
        </View>
        <View style={Styles.rowOrder}>
          <Text>Selected Days : </Text>
          {detailsData.selectedDays &&
            detailsData.selectedDays.map((ele, i) => (
              <Text key={i} style={Styles.detailsText}>
                {ele}
              </Text>
            ))}
        </View>
        <View style={Styles.rowOrder}>
          <Text>Quantity :</Text>
          <Text style={Styles.detailsText}>{detailsData.qty}</Text>
        </View>
        <View style={Styles.rowOrder}>
          <Text>Started Date :</Text>
          <Text style={Styles.detailsText}> {detailsData.selectedDate}</Text>
        </View>
        <View style={Styles.rowOrder}>
          <Text>Price :</Text>
          <Text style={Styles.detailsText}>
            ₹ {detailsData.price} / per meal
          </Text>
        </View>

        <View style={Styles.rowOrder}>
          <Text>Total : </Text>
          <Text style={Styles.detailsText}>
            {' '}
            ₹{' '}
            {detailsData.subsPlaneId == 1
              ? detailsData.price *
                detailsData.qty *
                detailsData.selectedDays.length *
                4
              : detailsData.price *
                detailsData.qty *
                detailsData.selectedDays.length}
          </Text>
          <Text style={Styles.detailsText}>
            {' '}
            + ₹
            {detailsData.subsPlaneId == 1
              ? customePrice * detailsData.selectedDays.length * 4
              : customePrice * detailsData.selectedDays.length}{' '}
            Customize Food
          </Text>
        </View>
        <View style={Styles.rowOrder}>
          <Text>Final Total : </Text>
          <Text style={Styles.detailsPriceText}>
            {' '}
            ₹{' '}
            {detailsData.subsPlaneId == 1
              ? detailsData.price *
                  detailsData.qty *
                  detailsData.selectedDays.length *
                  4 +
                customePrice * detailsData.selectedDays.length * 4
              : detailsData.price *
                  detailsData.qty *
                  detailsData.selectedDays.length +
                customePrice * detailsData.selectedDays.length}
          </Text>
        </View>
        <View style={Styles.detailsConfirmBtn}>
          <Button
            title="Confirm order"
            buttonStyle={{
              backgroundColor: '#ff6b01',
              borderRadius: 30,
            }}
            containerStyle={{
              width: 200,
            }}
            titleStyle={{fontWeight: 'bold'}}
            onPress={() => handleSubmitAllDetails()}
          />
        </View>
      </Card>
      </ScrollView>
    </>
  );
};

const Styles = StyleSheet.create({
  detailsText: {
    fondSize: 18,
    color: '#999999',
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
});
export default Details;
