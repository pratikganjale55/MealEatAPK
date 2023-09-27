import React, {useState} from 'react';
import {View, Switch, Text} from 'react-native';

const CustomeHeader = ({onToggleChange, toggleValue}) => {
  return (
    <>
      <View style={{padding: 10, backgroundColor: '#ff6b01'}}>
        <Switch value={toggleValue} onValueChange={onToggleChange} />

        <Text style={{marginLeft: 10, textAlign : "right", color : "white"}}>
          {toggleValue ? 'Arabic' : 'English'}
        </Text>
      </View>
    </>
  );
};

export default CustomeHeader;
