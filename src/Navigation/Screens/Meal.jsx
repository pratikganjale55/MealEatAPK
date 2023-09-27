import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import liteMealData from '../../../assets/data/liteMeal';
import stdMealData from '../../../assets/data//stdMeal';
import {Divider} from '@rneui/themed';
import {Tooltip} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SubscriptionModel from '../../SubscriptionModel';
import {MealContext} from '../../Context/ContextProvider';
import {useTranslation} from 'react-i18next';

const ControlledToolTip = props => {
  const [isToolOpen, setToolTip] = useState(false);

  return (
    <Tooltip
      visible={isToolOpen}
      onOpen={() => {
        setToolTip(true);
      }}
      onClose={() => {
        setToolTip(false);
      }}
      {...props}
    />
  );
};

const Meal = ({navigation}) => {
  const [selectedMeal, setSelectedMeal] = useState('lite');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {setUserSubData, subData, toggleValue} = useContext(MealContext);
  const {t} = useTranslation();
  const handleMealSelection = mealType => {
    setSelectedMeal(mealType);
  };
  const dataSource = selectedMeal == 'standard' ? stdMealData : liteMealData;

  const toggleSubscriptionModal = item => {
    setUserSubData(item);
    setIsModalVisible(!isModalVisible);
  };
  return (
    <>
      <View style={style.mealContainer}>
        <View style={style.mealHeadingView}>
          <Text style={style.mealHeadingText}>
            {toggleValue
              ? t('What would you like to eat ?')
              : 'What would you like to eat ?'}
          </Text>
        </View>

        <View style={style.buttonsContainer}>
          <TouchableOpacity
            onPress={() => handleMealSelection('lite')}
            style={[
              style.button,
              selectedMeal === 'lite' && style.selectedButton,
            ]}>
            <Text style={style.buttonText}>
              {toggleValue
                ? t('Subscription Lite Meal')
                : 'Subscription Lite Meal'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleMealSelection('standard')}
            style={[
              style.button,
              selectedMeal === 'standard' && style.selectedButton,
            ]}>
            <Text style={style.buttonText}>
              {' '}
              {toggleValue
                ? t('Subscription Standard Meal')
                : 'Subscription Standard Meal'}
            </Text>
          </TouchableOpacity>

          {/* // Modal of Subscription // */}

          <SubscriptionModel
            isVisible={isModalVisible}
            onClose={toggleSubscriptionModal}
            navigation={navigation}
          />
        </View>

        {/* // scrollViewofMeal */}
        <ScrollView style={style.liteMealScroll}>
          <FlatList
            data={dataSource}
            renderItem={({item}) => (
              <View style={style.mealItem}>
                <Image source={{uri: item.image}} style={style.mealImage} />
                <View style={style.mealDetails}>
                  <Text style={style.mealTitle}>
                    {toggleValue ? t(item.title) : item.title}
                  </Text>

                  <Text style={{color: '#999999'}}>
                    {toggleValue ? t(item.subtitle) : item.subtitle}
                  </Text>
                  <View style={{flexDirection: 'row', color: '#999999'}}>
                    <Text style={{color: 'black'}}>
                      ₹ {toggleValue ? t(item.price) : item.price}
                    </Text>
                    <Text style={{color: 'green', fontSize: 12}}>
                      {'   '} {item.discount} Off
                    </Text>
                  </View>
                  <ControlledToolTip
                    containerStyle={{
                      height: '200',
                      backgroundColor: '#ff8f00',
                      padding: 5,
                    }}
                    popover={
                      <View>
                        <Text style={{textAlign: 'center', color: 'white'}}>
                          {toggleValue ? t('Details') : 'Details'}
                        </Text>
                        <Divider color="white" width={3} />
                        <Text style={{color: 'white', marginVertical: 5}}>
                          {toggleValue ? t(item.inside) : item.inside}
                        </Text>
                        <Text style={{color: 'white', marginVertical: 5}}>
                          {toggleValue ? t(item.details) : item.details}
                        </Text>
                      </View>
                    }>
                    <Text
                      style={{
                        color: '#318CE7',
                        textDecorationLine: 'underline',
                      }}>
                      {toggleValue ? t('More details...') : 'More details...'}
                    </Text>
                  </ControlledToolTip>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      style={style.subscriptionButton}
                      onPress={() => toggleSubscriptionModal(item)}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={style.subscriptionButtonText}>
                          {toggleValue ? t('Subscribe Now') : 'Subscribe Now'}
                        </Text>
                        <Text>
                          <Ionicons
                            name="add-circle-outline"
                            size={18}
                            style={{color: 'white'}}
                          />
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                      {item.star.map((_, i) => {
                        return (
                          <Ionicons
                            name="star"
                            size={14}
                            style={{color: '#FF9529'}}
                          />
                        );
                      })}
                      <Ionicons
                        name="star-half"
                        size={14}
                        style={{color: '#FF9529'}}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </ScrollView>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  mealContainer: {
    flex: 1,
    padding: 10,
  },
  mealHeadingView: {
    marginVertical: 10,
  },
  mealHeadingText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999999',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ff6b01',
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation : 3,
  },
  selectedButton: {
    backgroundColor: '#ff6b01',
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation : 3,
  },
  buttonText: {
    color: 'black',
  },
  mealContent: {
    padding: 20,
  },

  // scrollviewStyle //

  liteMealScroll: {
    marginBottom: 20,
    paddingVertical: 10,
  },
  mealContent: {
    padding: 20,
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  mealImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  mealDetails: {
    flex: 1,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#040c17',
  },
  subscriptionButton: {
    backgroundColor: '#ff6b01',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  subscriptionButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Meal;
