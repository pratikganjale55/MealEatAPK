import React, {useState, useContext} from 'react';
import {View, Text} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {MealContext} from './Context/ContextProvider';

const labels = ['Details', 'Address', 'Payment'];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 5,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: '#ff6b01',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#ff6b01',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013',
};
const StepIndicatorCom = () => {
  const {position} = useContext(MealContext);

  return (
    <>
      <View style={{padding: 10}}>
        <StepIndicator
          currentPosition={position}
          labels={labels}
          stepCount={3}
          customStyles={customStyles}
        />
      </View>
    </>
  );
};

export default StepIndicatorCom;
