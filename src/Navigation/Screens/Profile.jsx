import {Input, ListItem} from '@rneui/themed';
import React, {useState, useEffect, useRef} from 'react';
import {Image, Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Divider, Surface} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const Profile = () => {
  return (
    <>
    <ScrollView>
      <View style={style.Wavecontainer}>
        <View style={style.wave}>
          <Text style={style.profileText}>Profile</Text>
        </View>
        <View style={style.userProfileContainer}>
          <Image
            source={{
              uri: 'https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg?size=626&ext=jpg',
            }}
            style={style.userProfileImage}
          />
        </View>
        <View style={style.userNameText}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Pratik Ganjale</Text>
          <Text>9876543234</Text>
        </View>
      </View>
      <View style={style.userDetailsView}>
        <Surface style={style.surface} elevation={3}>
          <Input placeholder='First Name'/>
        </Surface>
        <Surface style={style.surface} elevation={3}>
          <Input placeholder='Last Name'/>
        </Surface>
      </View>
      </ScrollView>
    </>
  );
};
const style = StyleSheet.create({
  Wavecontainer: {
    height: 250,
    overflow: 'hidden',
    justifyContent: 'center',
    marginTop: 10,
  },
  wave: {
    flex: 1,
    backgroundColor: '#ff6b01',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userProfileContainer: {
    position: 'relative',
    top: -20,
    alignItems: 'center',
    marginBottom: -20,
  },
  userProfileImage: {
    width: 120,
    height: 120,
    borderRadius: 50,
  },
  userNameText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  userDetailsView: {
    padding: 8,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surface: {
    flexDirection: 'row',
    width: width - 40,
    marginTop: 15,
    borderRadius: 20,
    backgroundColor: 'white',
  },
});
export default Profile;
