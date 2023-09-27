import { Card, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const AddSubCstmFood = ({
  item,
  i,
  handleIncrCstmMeal,
  handleDecrCstmMeal,
  addCstmFood,
}) => {
  return (
    <>
      <Card key={i}>
        <View style={styles.cardCstmContainer}>
          <View>
            <Text style={styles.customeItemtext}>{item.food}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => handleIncrCstmMeal(item.food)}
              style={styles.customeIncreBtn}
            >
              <Text>+</Text>
            </TouchableOpacity>
            <Text>{addCstmFood[item.food]}</Text>
            <TouchableOpacity
              onPress={() => handleDecrCstmMeal(item.food)}
              style={styles.customeDecreBtn}
            >
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
    color: "#ff6b01",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardCstmContainer: {
    flexDirection: "row",
    // padding: 10,
    justifyContent: "space-around",
  },
  customeIncreBtn: {
    backgroundColor: "#ddd",
    padding: 8,
    margin: 5,
    borderRadius: 5,
  },
  customeDecreBtn: {
    backgroundColor: "#ddd",
    padding: 8,
    margin: 5,
    borderRadius: 5,
  },
});
export default AddSubCstmFood;
