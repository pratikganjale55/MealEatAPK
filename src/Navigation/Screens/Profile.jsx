import {Button, Input, ListItem} from '@rneui/themed';
import React, {useState, useEffect, useContext} from 'react';
import {
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Divider, Modal, Surface} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {MealContext} from '../../Context/ContextProvider';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const Profile = () => {
  const [selectImg, setSelectImg] = useState(null);
  const [isProfileModal, setIsProfileModal] = useState(false);
  const {isLogin, setIsLogin, userName} = useContext(MealContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
  });
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
  });

  const [isFirstNameEmpty, setIsFirstNameEmpty] = useState(true);
  const [isLastNameEmpty, setIsLastNameEmpty] = useState(true);
  const [isMobileNumberEmpty, setIsMobileNumberEmpty] = useState(true);
  const [isNumTenDigit, setIsNumTenDigit] = useState(true);
  const hideModal = () => setIsProfileModal(false);

  const isValidMobileNumber = mobileNumber => {
    const mobileNumberPattern = /^\d{10}$/;
    return mobileNumberPattern.test(mobileNumber);
  };

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
    if (fieldName === 'firstName') {
      setIsFirstNameEmpty(value.trim() === '');
    } else if (fieldName === 'lastName') {
      setIsLastNameEmpty(value.trim() === '');
    } else if (fieldName === 'mobileNumber') {
      setIsMobileNumberEmpty(value.trim() === '');
      const isNum = isValidMobileNumber(value);
      setIsNumTenDigit(isNum);
    }
  };
  const handleSubmit = () => {
    console.log(formData);
    setProfileData(formData);
    setIsProfileModal(!isProfileModal);
    setFormData({
      firstName: '',
      lastName: '',
      mobileNumber: '',
    });
  };
  const openImagePicker = () => {
    // console.log('image picker....');
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1200,
      maxWidth: 1200,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectImg(imageUri);
      }
    });
  };

  const handleLogout = () => {
    setIsLogin(!isLogin);
  };

  const getUserDetails = async () => {
    try {
      const res = await fetch('https://weak-gray-drill-yoke.cyclic.cloud/user');
      const userData = await res.json();
      console.log(userData);
      const [firstName, lastName] = userName.split(' ');
      const user = userData.find(item => {
        return item.firstName === firstName && item.lastName === lastName;
      });
      if (user) {
        setProfileData(user);
        // console.log("user >>>" , user)
      } else {
        console.log('user not found');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <>
      <KeyboardAwareScrollView>
        <View style={style.Wavecontainer}>
          <View style={style.wave}></View>
          <View style={style.userProfileContainer}>
            {selectImg ? (
              <Image
                source={{uri: selectImg}}
                style={style.userProfileImage}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={{
                  uri: 'https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg?size=626&ext=jpg',
                }}
                style={style.userProfileImage}
              />
            )}

            <TouchableOpacity
              style={{position: 'relative', right: -25, top: -10}}
              onPress={openImagePicker}>
              <Ionicons name={'camera'} size={30} />
            </TouchableOpacity>
          </View>
          <View style={style.userNameText}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {profileData.firstName + ' ' + profileData.lastName}
            </Text>
            <Text style={{marginVertical : 5 ,}}>{profileData.mobileNumber}</Text>
            <TouchableOpacity
              onPress={() => setIsProfileModal(!isProfileModal)}>
              <View
                style={{
                  padding: 10,
                  backgroundColor: '#ff6b01',
                  marginTop: 10,
                  flexDirection: 'row',
                  borderRadius: 15,
                }}>
                <Icon name="edit" size={20} color="white" />
                {/* <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                    marginLeft: 10,
                  }}>
                  Edit
                </Text> */}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <View
            style={{
              backgroundColor: '#ff6b01',
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 30,
              padding: 8,
              width: 150,
              marginHorizontal: 100,
              marginVertical: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="sign-out" size={24} color="white" />
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                marginLeft: 10,
              }}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>

      <Modal
        visible={isProfileModal}
        onDismiss={hideModal}
        style={{padding: 10}}>
        <View style={style.profileEditModal}>
          <View style={style.userDetailsView}>
            <Surface style={style.surface} elevation={2}>
              <TextInput
                placeholder=" First Name"
                onChangeText={text => handleInputChange('firstName', text)}
                value={formData.firstName}
              />
            </Surface>
            <Surface style={style.surface} elevation={2}>
              <TextInput
                placeholder=" Last Name"
                onChangeText={text => handleInputChange('lastName', text)}
                value={formData.lastName}
              />
            </Surface>
            <Surface style={style.surface} elevation={2}>
              <TextInput
                placeholder=" Mobile Number"
                onChangeText={text => handleInputChange('mobileNumber', text)}
                value={formData.mobileNumber}
              />
            </Surface>
            {isNumTenDigit == false && (
              <Text style={{color: 'red'}}>Check mobile number</Text>
            )}
          </View>
          <View style={style.profileBtn}>
            <Button
              title={'Submit'}
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
              onPress={handleSubmit}
              disabled={
                formData.firstName == '' ||
                formData.lastName == '' ||
                formData.mobileNumber == '' ||
                isNumTenDigit == false
              }
            />
          </View>
        </View>
      </Modal>
    </>
  );
};
const style = StyleSheet.create({
  Wavecontainer: {
    height: 300,
    overflow: 'hidden',
    justifyContent: 'center',
    // marginTop: 10,
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
    top: -50,
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
    // marginTop: 5,
  },
  userDetailsView: {
    padding: 5,
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
  profileBtn: {
    alignItems: 'center',
  },
});
export default Profile;
