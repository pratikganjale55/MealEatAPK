import {Button, Card} from '@rneui/themed';
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MealContext} from './Context/ContextProvider';
import UserLocation from './SubComponent/UserLocation';
import StepIndicatorCom from './StepIndicatorCom';

const width = Dimensions.get('screen').width;
const Address = ({navigation}) => {
  const [isAddressModal, setAddressModal] = useState(false);
  const {detailsData, setPosition} = useContext(MealContext);
  const [addressId, setAddressId] = useState();
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
  });
  const [addressData, setAddressData] = useState();
  const [selectedAddress, setSelectedAddress] = useState();
  const handleAddressModal = () => {
    setAddressModal(!isAddressModal);
  };

  const handleAddAdress = async () => {
    try {
      const res = await fetch('https://weak-gray-drill-yoke.cyclic.cloud/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(address),
      });

      const data = await res.json();
      if (data) {
        getUserAddress();
      }
      setAddressModal(false);
      //  console.log("new address", data)
    } catch (error) {
      console.log('post user address details', error);
    }
  };
  const handleAddressProceed = async () => {
    try {
      const res = await fetch(`https://weak-gray-drill-yoke.cyclic.cloud/address`);
      const data = await res.json();

      setSelectedAddress(data);
      // getUserAddress();
      console.log('select address', selectedAddress);
    } catch (error) {
      console.log('error while getting selected address', error);
    }
    setPosition(2);
    navigation.navigate('Payment');
  };
  const handleSelectExistAddress = id => {
    console.log(id);
    setAddressId(id);
  };
  // console.log(detailsData);

  const getUserAddress = async () => {
    try {
      const res = await fetch('https://weak-gray-drill-yoke.cyclic.cloud/address');

      const data = await res.json();
      if (data) {
        setAddressData(data);
      }
      console.log('user subs data', data);
    } catch (error) {
      console.log('Error while getting user subs data', error);
    }
  };
  useEffect(() => {
    getUserAddress();
  }, []);

  return (
    <>
      <StepIndicatorCom />
      <ScrollView>
        <View>
          <Card>
            <Card.Title style={styles.addressTitle}>ADDRESS</Card.Title>
            <Card.Divider />
            {addressData &&
              addressData.map((item, i) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleSelectExistAddress(item.id)}>
                    <View
                      style={
                        addressId == item.id
                          ? styles.exitingAddress
                          : styles.exitingAddressChange
                      }>
                      <View>
                        <Text
                          style={addressId == item.id ? {color: 'white'} : ''}>
                          {item.street}
                        </Text>
                        <Text
                          style={addressId == item.id ? {color: 'white'} : ''}>
                          {item.city}
                        </Text>
                        <Text
                          style={addressId == item.id ? {color: 'white'} : ''}>
                          {' '}
                          {item.state}
                        </Text>
                        <Text
                          style={addressId == item.id ? {color: 'white'} : ''}>
                          {' '}
                          {item.postalCode}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}

            <View style={styles.prevAddress}>
              <UserLocation />
            </View>
            <Button
              title="Add New Address"
              onPress={handleAddressModal}
              icon={
                <Ionicons name="add-circle-outline" size={18} color={'white'} />
              }
              buttonStyle={{
                borderWidth: 1,
                borderColor: '#ff6b01',
                backgroundColor: 'transparent',
                color: '#ff6b01',
                marginTop: 10,
              }}
              titleStyle={{
                color: '#ff6b01',
              }}
            />
            <View style={styles.addressProceedBtn}>
              <Button
                title="Proceed"
                onPress={handleAddressProceed}
                buttonStyle={{
                  backgroundColor: '#ff6b01',
                }}
              />
            </View>
          </Card>
        </View>

        {/* // modal // */}
        <Modal transparent={true} visible={isAddressModal} onClo>
          <View style={styles.addressModalView}>
            <View style={styles.modalAddContent}>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Street Address"
                  value={address.street}
                  onChangeText={text => setAddress({...address, street: text})}
                />
                <TextInput
                  style={styles.input}
                  placeholder="City"
                  value={address.city}
                  onChangeText={text => setAddress({...address, city: text})}
                />
                <TextInput
                  style={styles.input}
                  placeholder="State"
                  value={address.state}
                  onChangeText={text => setAddress({...address, state: text})}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Postal Code"
                  value={address.postalCode}
                  onChangeText={text =>
                    setAddress({...address, postalCode: text})
                  }
                />
              </View>
              <View style={styles.modalAddButtons}>
                <TouchableOpacity
                  onPress={handleAddressModal}
                  style={styles.modalAddCloseBtn}>
                  <Text>Close</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleAddAdress(navigation)}
                  style={styles.modalAddProceedBtn}>
                  <Text>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  addressTitle: {
    color: '#999999',
  },
  prevAddress: {
    marginTop: 10,
  },
  modalAddContent: {
    backgroundColor: 'white',
    width: width - 40,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  exitingAddress: {
    width: '100%',
    backgroundColor: '#ff6b01',
    padding: 20,

    borderRadius: 10,
    marginTop: 5,
  },
  exitingAddressChange: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 5,
  },
  addressModalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalAddButtons: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
  },
  modalAddCloseBtn: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: '#ff6b01',
  },
  modalAddProceedBtn: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: '#ff6b01',
    backgroundColor: '#ff6b01',
  },
  input: {
    height: 40,
    width: width - 80,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  addressProceedBtn: {
    marginTop: 20,
  },
});
export default Address;
