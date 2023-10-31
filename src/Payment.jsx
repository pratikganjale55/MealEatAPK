import React, {useContext, useEffect} from 'react';
import {Text, View} from 'react-native';
import StepIndicatorCom from './StepIndicatorCom';
import {Button} from '@rneui/themed';
import {MealContext} from './Context/ContextProvider';
import {useTranslation} from 'react-i18next';

const Payment = ({navigation}) => {
  const {toggleValue, setPosition} = useContext(MealContext);
  const {t} = useTranslation();
  useEffect(() => {
    setPosition(3);
  }, []);
  return (
    <>
      <StepIndicatorCom />
      <View style={{alignItem: 'center', justifyContent: 'center'}}>
        <Text>Payment</Text>
      </View>

      <View style={{alignItem: 'center', justifyContent: 'center'}}>
        <Button
          title={toggleValue ? t('Go to Meal') : 'Go to Meal'}
          buttonStyle={{
            backgroundColor: '#ff6b01',
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 60,
            marginVertical: 20,
          }}
          titleStyle={{fontWeight: 'bold'}}
          onPress={() => navigation.navigate('Meal planes')}
        />
      </View>
    </>
  );
};

export default Payment;
