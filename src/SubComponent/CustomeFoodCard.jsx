import {Card} from '@rneui/themed';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const CustomeFoodCard = ({
  handleIncrementCustome,
  handleDecrementCustome,
  item,
  i,
  custmFoodObj,
}) => {

  console.log("custmFoodObj[item.food] >>>", custmFoodObj[item.food])
  return (
    <>
      <Card key={i}>
        <View style={styles.cardContainer}>
          <View>
            <Text style={styles.customeItemtext}>{item.food}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => handleIncrementCustome(item.food)}
              style={styles.customeIncreBtn}>
              <Text>+</Text>
            </TouchableOpacity>
            {custmFoodObj[item.food] == undefined ? (
              <Text> 0 </Text>
            ) : (
              <Text>{custmFoodObj[item.food]}</Text>
            )}
            <TouchableOpacity
              onPress={() => handleDecrementCustome(item.food)}
              style={styles.customeDecreBtn}
              disabled={custmFoodObj[item.food] == undefined}>
              <Text>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  customeItemtext: {
    fontSize: 16,
    color: '#ff6b01',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
  },
  customeIncreBtn: {
    backgroundColor: '#ddd',
    padding: 8,
    margin: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: -3,
      height: -3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
  },
  customeDecreBtn: {
    backgroundColor: '#ddd',
    padding: 8,
    margin: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: -3,
      height: -3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
  },
  selectedCustomeButton: {
    backgroundColor: '#ff6b01',
  },
});
export default CustomeFoodCard;
