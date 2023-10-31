import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {MealContext} from '../../Context/ContextProvider';
import {Button, Card, Skeleton} from '@rneui/themed';
import {List, Modal} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import customization from '../../../assets/data/custimization';
import AddSubCstmFood from '../../SubComponent/AddSubCstmFood';
import {Calendar} from 'react-native-calendars';
import {useTranslation} from 'react-i18next';
import arCustomization from '../../../assets/data/arCustomization';
import moment from 'moment';

const width = Dimensions.get('screen').width;
const MySubscription = ({navigation}) => {
  const {
    userSubscriptionsData,
    customePrice,
    extraFood,
    setExtraFood,
    detailsData,
    setDetailsData,
    setAddCstmFood,
    addCstmFood,
    userName,
    toggleValue,
  } = useContext(MealContext);

  const [cstmPlaneId, setCstmPlaneId] = useState();
  const [visible, setVisible] = React.useState(false);
  const [userSubsData, setUsersSubsData] = useState([]);
  const [cstmFoodDate, setcstmFoodDate] = useState(null);
  const [isCalendarVisible, setIsCalendarView] = useState(false);
  const [isskeleton, setIsSkeleton] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [getExtraFdData, setGetExtraFdData] = useState();
  const [isBtnVisible, setIsBtnVisible] = useState(false);
  const [selectSubsDate, setSelectSubsDate] = useState();
  const {t} = useTranslation();
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const showAddCutomeMeal = (planeId, selectedDate) => {
    setCstmPlaneId(planeId);
    setVisible(!visible);
    setSelectSubsDate(selectedDate);
    setAddCstmFood({
      'Gravy (Rs 30)': 0,
      'Rice (Rs 35)': 0,
      'Roti (Rs 9)': 0,
      'Sweet (Rs 35)': 0,
    });
    console.log('selectedDate >>>', selectedDate);
  };
  const currentDate = moment().format(selectSubsDate);
  const hideModal = () => setVisible(false);

  const totalCstmvalues = Object.values(addCstmFood).reduce(
    (acc, value) => acc + value,
    0,
  );
  const isCtmBtnVisible = totalCstmvalues > 0;
  const handleIncrCstmMeal = food => {
    setAddCstmFood(prev => ({
      ...prev,
      [food]: (prev[food] || 0) + 1,
    }));
    setIsBtnVisible(!isBtnVisible);
  };
  const handleDecrCstmMeal = food => {
    setAddCstmFood(prev => ({
      ...prev,
      [food]: (prev[food] || 0) - 1,
    }));
  };

  const handleSelectCstmDate = date => {
    setcstmFoodDate(date.dateString);
    setIsCalendarView(false);
  };

  const toggleCalendar = () => {
    setIsCalendarView(!isCalendarVisible);
  };

  const handleAddCstmFood = async () => {
    try {
      setAddCstmFood({...addCstmFood, cstmFoodDate, cstmPlaneId});
      // setAddCstmFood(addCstmFood)
      setDetailsData({...detailsData, addCstmFood});
      setExtraFood([...extraFood, addCstmFood]);

      console.log('addCstmFood from cstm', addCstmFood);
      setVisible(false);
      navigation.navigate('CustomeDetails');
    } catch (error) {
      console.log('error while post extra cstm food', error);
    }
  };
  // console.log("detailsData", addCstmFood);

  const getUserSubsDetails = async () => {
    try {
      setIsSkeleton(true);
      const res = await fetch(
        'https://weak-gray-drill-yoke.cyclic.cloud/userSubscriptionsData',
      );

      const data = await res.json();
      console.log('res', data);
      if (data) {
        const ParUserSubsData = data.filter(item => item.userName == userName);
        console.log('username >>>>', ParUserSubsData);
        setIsSkeleton(false);
        setUsersSubsData(ParUserSubsData);
        setRefreshing(false);
      }
      // console.log('user subs data', data);
    } catch (error) {
      console.log('Error while getting user subs data', error);
    }
  };

  // get request for extra food //
  const getExtraFoodDetails = async () => {
    try {
      setIsSkeleton(true);
      const res = await fetch(
        'https://weak-gray-drill-yoke.cyclic.cloud/extraFood',
      );

      const data = await res.json();
      if (data) {
        const userExtraFood = data.filter(item => item.userName == userName);
        console.log('userExtraFood >>>', userExtraFood);
        setGetExtraFdData(userExtraFood);
      }
    } catch (error) {
      console.log('Error while getting extra food data', error);
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    setIsSkeleton(false);
    setAddCstmFood({
      'Gravy (Rs 30)': 0,
      'Rice (Rs 35)': 0,
      'Roti (Rs 9)': 0,
      'Sweet (Rs 35)': 0,
    });
    getUserSubsDetails();
    getExtraFoodDetails();
  };
  useEffect(() => {
    getUserSubsDetails();
    getExtraFoodDetails();
    setVisible(false);
  }, []);
  console.log('addCstmFood >>>>', userSubsData);
  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.subContainer}>
          {isskeleton ? (
            <>
              <Skeleton
                animation="wave"
                marginTop={6}
                width={width - 20}
                height={60}
              />
              <View style={{marginBottom: '10px'}}></View>
              <Skeleton
                animation="wave"
                marginTop={6}
                width={width - 20}
                height={60}
              />
              <View style={{marginBottom: '10px'}}></View>
              <Skeleton
                animation="wave"
                marginTop={6}
                width={width - 20}
                height={60}
              />
            </>
          ) : userSubsData.length == 0 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <Text>No subscriptions yet</Text>
            </View>
          ) : (
            userSubsData.map((ele, i) => {
              return (
                <View style={styles.subView}>
                  <List.Accordion
                    key={i}
                    title={toggleValue ? t(ele.title) : ele.title}
                    left={() => (
                      <Ionicons
                        name="wallet"
                        size={20}
                        color={'#ff6b01'}
                        style={styles.subViewIcon}
                      />
                    )}>
                    <Card style={styles.subsDetailsCard}>
                      <View style={styles.rowSub}>
                        <Text>
                          {toggleValue ? t('Meal Type') : 'Meal Type'} :{' '}
                        </Text>
                        <Text style={styles.rghttextOfSubs}>
                          {toggleValue ? t(ele.mealType) : ele.mealType}
                        </Text>
                      </View>

                      <View style={styles.rowSub}>
                        <Text>{toggleValue ? t('Price') : 'Price'} : </Text>
                        <Text style={styles.rghttextOfSubs}>{ele.price}</Text>
                      </View>

                      <View style={styles.rowSub}>
                        <Text>
                          {toggleValue ? t('Quantity') : 'Quantity'} :{' '}
                        </Text>
                        <Text style={styles.rghttextOfSubs}>{ele.qty}</Text>
                      </View>

                      <View style={styles.rowSub}>
                        <Text>
                          {toggleValue ? t('Selected date') : 'Selected date'} :{' '}
                        </Text>
                        <Text style={styles.rghttextOfSubs}>
                          {ele.selectedDate}
                        </Text>
                      </View>
                      {/* selectedTime */}
                      <View style={styles.rowSub}>
                        <Text>
                          {toggleValue ? t('Selected Time') : 'Selected Time'} :{' '}
                        </Text>
                        <Text style={styles.rghttextOfSubs}>
                          {ele.selectedTime}
                        </Text>
                      </View>
                      <View style={styles.rowSub}>
                        <Text>{toggleValue ? t('Days') : 'Days'} : </Text>
                        <Text style={styles.rghttextOfSubs}>
                          {ele.selectedDays.map((ele, i) => {
                            return (
                              <Text key={i}>
                                {toggleValue ? t(ele) : ele},{' '}
                              </Text>
                            );
                          })}
                        </Text>
                      </View>

                      <View style={styles.rowSub}>
                        <Text> {toggleValue ? t('Plane') : 'Plane'} : </Text>
                        <Text style={styles.rghttextOfSubs}>
                          {ele.subsPlaneId == 1
                            ? toggleValue
                              ? t('Monthly')
                              : 'Monthly'
                            : ele.subsPlaneId == 2
                            ? toggleValue
                              ? t('Weekly')
                              : 'Weekly'
                            : toggleValue
                            ? t('Trial')
                            : 'Trial'}
                        </Text>
                      </View>

                      <View style={styles.rowSub}>
                        <Text> {toggleValue ? t('Total') : 'Total'} : </Text>
                        <Text style={styles.rghttextOfSubs}>
                          ₹{' '}
                          {ele.subsPlaneId == 1
                            ? ele.price *
                                ele.qty *
                                ele.selectedDays.length *
                                4 +
                              customePrice
                            : ele.price * ele.qty * ele.selectedDays.length +
                              customePrice}{' '}
                          /-
                        </Text>
                      </View>
                      {/* <Text>{ele.userName}</Text> */}
                      <View>
                        <Card.Title
                          style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 16,
                          }}>
                          {toggleValue ? t('Extra food') : 'Extra food'}
                        </Card.Title>
                        <ScrollView>
                          <View style={[styles.rowSub, styles.extraFdList]}>
                            <FlatList
                              data={getExtraFdData}
                              renderItem={({item, index}) => (
                                <View key={index}>
                                  {Object.entries(item).map(
                                    ([key, value], j) => {
                                      if (ele.planeId == item.cstmPlaneId) {
                                        return (
                                          <View key={j} style={styles.rowSub}>
                                            {key == 'cstmPlaneId' ||
                                            key == 'id' ||
                                            key == 'userName' ? (
                                              ''
                                            ) : (
                                              <>
                                                <Text>
                                                  {toggleValue
                                                    ? t(key)
                                                    : key == 'cstmTotal'
                                                    ? 'Total Price'
                                                    : key == 'cstmFoodDate'
                                                    ? 'Date'
                                                    : key}{' '}
                                                  :
                                                </Text>
                                                <Text
                                                  style={styles.rghttextOfSubs}>
                                                  {value}
                                                </Text>
                                              </>
                                            )}
                                          </View>
                                        );
                                      }
                                      return null;
                                    },
                                  )}
                                </View>
                              )}
                              // initialNumToRender={5}
                            />
                          </View>
                        </ScrollView>
                      </View>
                      <View style={styles.addCustomeMeal}>
                        <Button
                          title={
                            toggleValue
                              ? t('Add Custome Meal')
                              : 'Add Custome Meal'
                          }
                          buttonStyle={{
                            backgroundColor: '#ff6b01',
                            borderRadius: 30,
                          }}
                          containerStyle={{
                            width: 200,
                          }}
                          titleStyle={{fontWeight: 'bold'}}
                          onPress={() =>
                            showAddCutomeMeal(ele.planeId, ele.selectedDate)
                          }
                        />
                      </View>
                    </Card>
                  </List.Accordion>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* // Modal // */}

      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
        style={{padding: 20}}>
        <ScrollView>
          {(toggleValue ? arCustomization : customization).map((item, i) => {
            return (
              <AddSubCstmFood
                item={item}
                i={i}
                handleIncrCstmMeal={handleIncrCstmMeal}
                handleDecrCstmMeal={handleDecrCstmMeal}
                addCstmFood={addCstmFood}
              />
            );
          })}
          <Card>
            <View style={styles.cstmDateView}>
              <View style={styles.ctmDateContainer}>
                <Text style={{color: '#ff6b01'}}>
                  {toggleValue ? t('Start Date') : 'Start Date'} :
                </Text>
                <Text>
                  {' '}
                  {'   '}
                  {cstmFoodDate ? cstmFoodDate : '-'}
                </Text>
              </View>
              <Text onPress={toggleCalendar} style={styles.calenderView}>
                {isCalendarVisible ? (
                  <Ionicons name={'close'} size={30} color={'#ff6b01'} />
                ) : (
                  <Ionicons name={'calendar'} size={30} color={'#ff6b01'} />
                )}
              </Text>
            </View>
            {isCalendarVisible && (
              <Calendar
                onDayPress={handleSelectCstmDate}
                markedDates={
                  cstmFoodDate ? {[cstmFoodDate]: {selected: true}} : {}
                }
                minDate={currentDate}
              />
            )}
          </Card>
          <View style={styles.cstmFoodBtn}>
            <Button
              title={toggleValue ? t('Add Custome Meal') : 'Add'}
              buttonStyle={{
                backgroundColor: '#ff6b01',
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
              }}
              titleStyle={{fontWeight: 'bold'}}
              onPress={() => handleAddCstmFood()}
              disabled={cstmFoodDate == null || !isCtmBtnVisible}
            />
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    margin: 10,
    marginBottom: 20,
  },
  subView: {
    marginBottom: 10,
  },
  subsDetailsCard: {
    elevation: 10,
  },
  subViewIcon: {
    padding: 10,
    justifyContent: 'center',
  },
  rowSub: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  addCustomeMeal: {
    alignItems: 'center',
  },
  rghttextOfSubs: {
    color: 'black',
    fontSize: 16,
  },
  cstmDateView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  ctmDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cstmFoodBtn: {
    margin: 10,
    alignItems: 'center',
  },
  skeletonView: {
    marginTop: 5,
  },
  extraFdList: {
    textAlign: 'right',
    // height: 200,
  },
});

export default MySubscription;
