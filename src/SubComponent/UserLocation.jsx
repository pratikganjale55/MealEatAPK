import {Button, Image} from '@rneui/themed';
import React, {useState, useContext} from 'react';
import {PermissionsAndroid, Text, View, StyleSheet, TextInput} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {MealContext} from '../Context/ContextProvider';
import MapView, {Marker} from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from "react-native-vector-icons/Ionicons";
const userLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (error) {
    console.log('Error while getting geolocation permission', error);
    return false;
  }
};
const UserLocation = () => {
  const [location, setLocation] = useState(false);
  const [ismap, setIsMap] = useState(false);
  const [locationJsonData, setLocationJsonData] = useState({ city: "", place: "", state : "" })
  const {} = useContext(MealContext);

  const getLocationDetails = async (latitude, longitude) => {
    try {
      let res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
      );
      const jsonData = await res.json();
      console.log("jsonData", jsonData)
      setLocationJsonData({
        city: jsonData.locality,
        place: jsonData.city,
        state : jsonData.principalSubdivision
      })
      console.log('locationData', jsonData);
    } catch (error) {
      console.log(error);
    }
  };
  const getLocation = () => {
    const result = userLocationPermission();
    result.then(res => {
      // console.log("res", res)
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
            getLocationDetails(
              position.coords.latitude,
              position.coords.longitude,
            );
            setTimeout(() => {
              setIsMap(!ismap);
            }, 1000);
          },
          error => {
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
  };
  console.log(ismap)
  return (
    <>
      <View style={styles.liveLocationView}>
        <View style={styles.textLive}>
          <TouchableOpacity onPress={getLocation}>
            <Ionicons name="location" size={30} color={'#ff6b01'} />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.locationInput}
          placeholder="City"
          value={locationJsonData.city + " " + locationJsonData.place + " " + locationJsonData.state}
        />
      </View>
      {ismap && (
        <View>
          <Image
            style={{width: 500, height: 500}}
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-liberty&width=600&height=400&center=lonlat:${location.coords.longitude},${location.coords.latitude}&zoom=9&marker=lonlat:${location.coords.longitude},${location.coords.latitude};color:%230098ff;size:small;text:${location.coords.locality};textsize:small|lonlat:${location.coords.longitude},${location.coords.latitude};color:%23ff0000;size:small;text:yourlocation;textsize:small&apiKey=2dbd01f7f15f4020b2b614bbf0fc2b7b`,
            }}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  liveLocationView: {
    position: 'relative',
  },
  textLive: {
    // backgroundColor: "#040c17",
    position: 'absolute',
    height: '60%',
    width: 30,
    alignItems: 'center',
    right: 10,
    top: 5,
    zIndex: 2,
  },
  locationInput: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default UserLocation;
