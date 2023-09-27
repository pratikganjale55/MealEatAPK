import React, { useContext, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MealContext } from "./Context/ContextProvider";
import { Button, Divider, Image } from "@rneui/themed";
import { Calendar } from "react-native-calendars";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from 'react-i18next';  
import moment from 'moment';
const pattern = ["Mon", "Tue", "Web", "Thu", "Fri", "Sat"];
const arPattern = ["الاثنين", "الثلاثاء", "الويب", "الخميس", "الجمعة", "السبت"] ;

const SubsDetails = ({ navigation }) => {
  const [isIncBtnPress, setIsIncBtnPress] = useState(false);
  const [isDecBtnPress, setIsDecBtnPress] = useState(false);
  

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const {
    subData,
    subsPlaneId,
    detailsData,
    setDetailsData,
    handleSubmitDetails,
    setSelectedDays,
    setSelectedDate,
    selectedDate,
    selectedDays,
    setQty,
    qty,
    toggleValue,
    setSelectedTime,
    selectedTime,
  } = useContext(MealContext);

  const {t} = useTranslation() ;

  const currentDate = moment().format('YYYY-MM-DD');

  const toggleDaySelection = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleQtyIncr = () => {
    setQty((prev) => prev + 1);
    setIsIncBtnPress(true);
    setIsDecBtnPress(false);
  };
  const handleQtyDecre = () => {
    setQty((prev) => prev - 1);
    setIsIncBtnPress(false);
    setIsDecBtnPress(true);
  };
  const handleLunchType = (time) => {
    setSelectedTime(time);
    console.log(selectedTime);
  };
  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    setIsCalendarVisible(!isCalendarVisible);
    // console.log(selectedDate);
  };
  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  return (
    <>
      <ScrollView>
        <View style={styles.DetailsContainer}>
          <View style={styles.detailsTopView}>
            <Image
              source={{ uri: subData.image }}
              style={{
                width: 150,
                height: 200,
                resizeMode: "contain",
                aspectRatio: 1,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.mealTitle}>{toggleValue ? t(subData.title):subData.title}</Text>
              <Text style={{ color: "#999999" }}>{toggleValue ? t(subData.subtitle):subData.subtitle}</Text>
              <Text style={{ color: "#999999" }}>
                ₹ {subData.price} {toggleValue ? t("Per Meal") : "Per Meal"}
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.row}>
              <Text>{toggleValue ? t("Options") : "Options :"}</Text>
              <Text>
                {subsPlaneId == 1
                  ? "Monthly Subscription"
                  : "Weekly Subscription"
                }
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>{toggleValue ? t("Pattern") : "Pattern :"}</Text>
              {subsPlaneId == 3 ? (
                <Text>-</Text>
              ) : (
                <FlatList
                  data={toggleValue ? arPattern : pattern}
                  horizontal
                  renderItem={({ item }) => (
                    <View
                      style={[
                        styles.pattenBtn,
                        selectedDays.includes(item) && styles.selectedDayButton,
                      ]}
                    >
                      <TouchableOpacity
                        onPress={() => toggleDaySelection(item)}
                      >
                        <Text
                          style={
                            selectedDays.includes(item) && styles.patternTxt
                          }
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              )}
            </View>
            <View style={styles.row}>
              <Text> {toggleValue ? t("Quantity per Delivery") : "Quantity per Delivery :"}</Text>
              <View>
                <View style={styles.increBtn}>
                  <TouchableOpacity
                    onPress={handleQtyDecre}
                    disabled={qty == 1}
                  >
                    <Text
                      style={[
                        styles.decreSign,
                        isDecBtnPress && qty !== 1 && styles.btnPress,
                      ]}
                    >
                      -
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.qtyNumber}>{qty}</Text>
                <View style={styles.decreBtn}>
                  <TouchableOpacity onPress={handleQtyIncr}>
                    <Text
                      style={[
                        styles.increSign,
                        isIncBtnPress && styles.btnPress,
                      ]}
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <Text>{toggleValue ? t("Delivery Time") : "Delivery Time :"}</Text>
              <TouchableOpacity
                onPress={() => handleLunchType("lunch")}
                style={[
                  styles.timeButton,
                  selectedTime === "lunch" && styles.selectedTimeButton,
                ]}
              >
                <Text style={styles.timeButtonText}>{toggleValue ? t("Lunch") : "Lunch"}(12-2)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleLunchType("dinner")}
                style={[
                  styles.timeButton,
                  selectedTime === "dinner" && styles.selectedTimeButton,
                ]}
              >
                <Text style={styles.timeButtonText}>{toggleValue ? t("Dinner") : "Dinner"} (7-9)</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <View style={styles.dateContainer}>
                <Text>{toggleValue ? t("Start Date") : "Start Date"} :</Text>
                <Text>
                  {" "}
                  {"   "}
                  {selectedDate ? selectedDate : "-"}
                </Text>
              </View>
              <Text onPress={toggleCalendar} style={styles.calenderView}>
                {isCalendarVisible ? (
                  <Ionicons name={"close"} size={30} color={"#ff6b01"} />
                ) : (
                  <Ionicons name={"calendar"} size={30} color={"#ff6b01"} />
                )}
              </Text>
            </View>
            {isCalendarVisible && (
              <Calendar
                onDayPress={handleDateSelect}
                markedDates={
                  selectedDate ? { [selectedDate]: { selected: true } } : {}
                }
                minDate={currentDate} 
              />
            )}
          </View>
          <Button
            title={toggleValue ? t("Proceed") : "Proceed"}
            buttonStyle={{
              backgroundColor: "#ff6b01",
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 30,
            }}
            containerStyle={{
              width: 200,
              marginHorizontal: 50,
              marginVertical: 20,
            }}
            titleStyle={{ fontWeight: "bold" }}
            onPress={() => handleSubmitDetails(navigation)}
            disabled={selectedDays.length <= 0 && selectedDate == null}
            
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  DetailsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  detailsTopView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#040c17",
  },
  // options style //

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  pattenBtn: {
    backgroundColor: "#ddd",
    padding: 5,
    margin: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: -3,
      height: -3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation : 3,
  },
  patternTxt: {
    color: "white",
  },
  selectedDayButton: {
    backgroundColor: "#ff6b01",
    color: "white",
  },
  increBtn: {
    backgroundColor: "#ddd",
    padding: 6,
    margin: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: -3,
      height: -3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation : 3,
  },
  increSign: {
    textAlign: "center",
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: -3,
      height: -3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation : 3,
  },
  decreBtn: {
    backgroundColor: "#ddd",
    width: 50,
    padding: 6,
    margin: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: -3,
      height: -3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation : 3,
    
  },
  decreSign: {
    textAlign: "center",
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: -3,
      height: -3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation : 3,
  },
  btnPress: {
    backgroundColor: "#ff6b01",
    color: "white",
    borderRadius: 5,
  },
  qtyNumber: {
    textAlign: "center",
    fontSize: 16,
  },
  timeButton: {
    backgroundColor: "#ddd",
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
    elevation : 3,
  },
  selectedTimeButton: {
    backgroundColor: "#ff6b01",
    shadowColor: '#000',
    shadowOffset: {
      width: -3,
      height: -3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation : 3,
  },
  timeButtonText: {
    textAlign: "center",
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: -3,
      height: -3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation : 3,
  },
  dinnerBtn: {
    backgroundColor: "#ddd",
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  selectedTimeButton: {
    backgroundColor: "#ff6b01",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SubsDetails;
