import React, {useState, useContext} from 'react';
import {View, TextInput, Text, Button, StyleSheet, Image} from 'react-native';
import {ActivityIndicator, Card} from 'react-native-paper';
import {MealContext} from './Context/ContextProvider';
import Ionicons from 'react-native-vector-icons/FontAwesome';

const Login = ({navigation}) => {
  const {setIsLogin, isLogin, setUsername} = useContext(MealContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    password: '',
  });
  const [passFormat, setPassFormat] = useState(true);
  const [isFirstName, setIsFirstName] = useState(false);
  const [isLastName, setLastName] = useState(false);
  const [isMobileNumber, setMobileNumber] = useState(true);
  const [isLoader, setIsLoader] = useState(false);
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    setPassFormat(true);
    setIsFirstName(false);
    setLastName(false);
    setMobileNumber(true);
  };
  const handleSubmit = async () => {
    console.log(formData);
    if (!isValidFirstName(formData.firstName)) {
      setIsFirstName(!isFirstName);
      return;
    } else if (!isValidLastName(formData.lastName)) {
      setLastName(!isLastName);
      return;
    } else if (!isValidMobileNumber(formData.mobileNumber)) {
      setMobileNumber(!isMobileNumber);
      return;
    } else if (!isValidPassword(formData.password)) {
      setPassFormat(!passFormat);
      return;
    } else {
      // console.log("else")
      setUsername(formData.firstName + ' ' + formData.lastName);
      setIsLoader(true);
      try {
        await fetch('https://weak-gray-drill-yoke.cyclic.cloud/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        setIsLogin(!isLogin);
        setIsLoader(false);

        navigation.navigate('Home');
        console.log('repoonse while post user data', isLogin);
      } catch (error) {
        console.log('login post error', error);
      }
    }
    // console.log(formData, isLogin);
  };
  const isValidFirstName = firstName => {
    return !!firstName;
    // console.log("!firstName >>>",!!firstName)
  };
  const isValidLastName = lastName => {
    return !!lastName;
  };
  const isValidMobileNumber = mobileNumber => {
    const mobileNumberPattern = /^\d{10}$/;
    // console.log('check mobile number', mobileNumberPattern.test(mobileNumber));
    return mobileNumberPattern.test(mobileNumber);
  };
  const isValidPassword = password => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    // console.log('Check password >>>', passwordRegex.test(password));
    return passwordRegex.test(password);
  };
  return (
    <>
      <View style={Styles.loginContainer}>
        <Card style={Styles.loginCard}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}>
            <Ionicons name={'user-circle'} size={50} color={'#005b8f'} />
          </View>

          <TextInput
            placeholder="First Name"
            style={Styles.input}
            onChangeText={text => handleInputChange('firstName', text)}
            value={formData.firstName}
          />
          {isFirstName && (
            <Text style={Styles.errorText}>First name is required</Text>
          )}
          <TextInput
            placeholder="Last Name"
            style={Styles.input}
            onChangeText={text => handleInputChange('lastName', text)}
            value={formData.lastName}
          />

          {isLastName && (
            <Text style={Styles.errorText}>Last name is required</Text>
          )}
          <TextInput
            placeholder="Mobile Number"
            style={Styles.input}
            onChangeText={text => handleInputChange('mobileNumber', text)}
            value={formData.mobileNumber}
          />
          {isMobileNumber ? (
            ''
          ) : (
            <Text style={Styles.errorText}>Check mobile number</Text>
          )}
          <TextInput
            placeholder="Password"
            style={Styles.input}
            onChangeText={text => handleInputChange('password', text)}
            value={formData.password}
            secureTextEntry={true}
          />
          {passFormat ? (
            ''
          ) : (
            <Text style={{color: 'red'}}>
              Password should have one Capital Letter, special letter and number
            </Text>
          )}
          {!isLoader ? (
            <Button
              title="Login"
              onPress={handleSubmit}
              style={Styles.loginBtn}
            />
          ) : (
            <ActivityIndicator animating={true} />
          )}
        </Card>
      </View>
    </>
  );
};

const Styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  loginCard: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  loginBtn: {
    backgroundColor: '#ff6b01',
  },
});
export default Login;
