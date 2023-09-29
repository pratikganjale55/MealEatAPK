import React, {useState} from 'react';
import {View, Switch, Text} from 'react-native';

const CustomeHeader = ({onToggleChange, toggleValue, headerTitle}) => {
  return (
    <>
      <View
        style={{padding: 10, backgroundColor: '#ff6b01', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{color : "white", fontSize : 20, fontWeight : "bold", padding : 8}}>{headerTitle}</Text>
        <View>
          <Switch value={toggleValue} onValueChange={onToggleChange} />
          <Text style={{textAlign: 'right', color: 'white'}}>
            {toggleValue ? 'Arabic' : 'English'}
          </Text>
        </View>
      </View>
    </>
  );
};

export default CustomeHeader;
