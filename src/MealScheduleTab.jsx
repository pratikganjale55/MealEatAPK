import React, {useEffect, useState, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Card} from 'react-native-paper';
import {MealContext} from './Context/ContextProvider';
import mealPlans from '../assets/data/mealPlans';

const MealScheduleTab = () => {
  const [expandedDay, setExpandedDay] = useState(null);
  const {toggleValue} = useContext(MealContext);
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const {t} = useTranslation();
  const toggleDay = day => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  useEffect(() => {
    setExpandedDay('Mon');
  }, []);
  return (
    <>
      <ScrollView style={{flex: 1}}>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          {daysOfWeek.map(day => (
            <TouchableOpacity
              key={day}
              style={[
                style.daysBtn,
                {
                  backgroundColor: expandedDay === day ? '#ff6b01' : 'white',
                  shadowColor: '#000',
                  shadowOffset: {width: -3, height: -3},
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  elevation: expandedDay === day ? 0 : 5,
                },
              ]}
              onPress={() => toggleDay(day)}>
              <Text>{toggleValue ? t(day) : day}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {expandedDay && (
          <View style={{padding: 10}}>
            {Object.keys(mealPlans[expandedDay]).map(
              (category, index) =>
                index % 2 === 0 && (
                  <View
                    key={category}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                    }}>
                    <Card
                      key={category}
                      style={{
                        flex: 1,
                        marginRight: 5,
                        padding: 10,
                        marginTop: 10,
                        backgroundColor: 'white',
                      }}>
                      <Card.Title
                        title={toggleValue ? t(category) : category}
                      />
                      <Card.Cover
                        source={{uri: mealPlans[expandedDay][category].uri}}
                        style={{
                          width: 150,
                          height: 110,
                          resizeMode: 'cover',
                        }}
                      />

                      <Card.Content style={{marginTop: 10}}>
                        <Text>
                          <Text style={{fontSize: 16, color: '#ff6b01'}}>
                            {toggleValue ? t('Lunch') : 'Lunch'}
                          </Text>{' '}
                          :{' '}
                          {toggleValue
                            ? 'فرخة'
                            : mealPlans[expandedDay][category].lunch}
                        </Text>
                        <Text>
                          <Text style={{fontSize: 16, color: '#ff6b01'}}>
                            {toggleValue ? t('Dinner') : 'Dinner'}
                          </Text>{' '}
                          :{' '}
                          {toggleValue
                            ? 'موسور'
                            : mealPlans[expandedDay][category].dinner}
                        </Text>
                      </Card.Content>
                    </Card>
                    {index + 1 < Object.keys(mealPlans[expandedDay]).length && (
                      <Card
                        key={Object.keys(mealPlans[expandedDay])[index + 1]}
                        style={{
                          flex: 1,
                          marginLeft: 5,
                          padding: 10,
                          marginTop: 10,
                          backgroundColor: 'white',
                        }}>
                        <Card.Title
                          title={
                            toggleValue
                              ? t(
                                  Object.keys(mealPlans[expandedDay])[
                                    index + 1
                                  ],
                                )
                              : Object.keys(mealPlans[expandedDay])[index + 1]
                          }
                        />
                        <Card.Cover
                          source={{
                            uri: mealPlans[expandedDay][
                              Object.keys(mealPlans[expandedDay])[index + 1]
                            ].uri,
                          }}
                          style={{
                            width: 150,
                            height: 120,
                            resizeMode: 'cover',
                          }}
                        />
                        <Card.Content>
                          <Text>
                            <Text style={{fontSize: 16, color: '#ff6b01'}}>
                              {toggleValue ? t('Lunch') : 'Lunch'}
                            </Text>{' '}
                            :{' '}
                            {toggleValue
                              ? 'بيضة'
                              : mealPlans[expandedDay][
                                  Object.keys(mealPlans[expandedDay])[index + 1]
                                ].lunch}
                          </Text>
                          <Text>
                            <Text style={{fontSize: 16, color: '#ff6b01'}}>
                              {toggleValue ? t('Dinner') : 'Dinner'}
                            </Text>{' '}
                            :{' '}
                            {toggleValue
                              ? 'بالكاري'
                              : mealPlans[expandedDay][
                                  Object.keys(mealPlans[expandedDay])[index + 1]
                                ].dinner}
                          </Text>
                        </Card.Content>
                      </Card>
                    )}
                  </View>
                ),
            )}
          </View>
        )}
      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  daysBtn: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: '#ff6b01',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 8,
    marginLeft: 5,
  },
});
export default MealScheduleTab;
