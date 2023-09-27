import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Divider} from '@rneui/themed';
import React, {useContext, useMemo, useState} from 'react';
import {
  Button,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RadioGroup} from 'react-native-radio-buttons-group';
import {MealContext} from './Context/ContextProvider';
import {useTranslation} from 'react-i18next';

const width = Dimensions.get('window').width;

const SubscriptionModel = ({isVisible, onClose, navigation}) => {
  const {subsPlaneId, setSubPlaneId, toggleValue} = useContext(MealContext);
  const {t} = useTranslation();
  const radioButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'Monthly Subscription',
        value: 'monthly_subscription',
      },
      {
        id: '2',
        label: 'Weekly Subscription  ',
        value: 'weekly_subscription',
      },
    ],
    [],
  );
  const arRadioButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'اشتراك شهري',
        value: 'monthly_subscription',
      },
      {
        id: '2',
        label: 'الاشتراك الأسبوعي',
        value: 'weekly_subscription',
      }
    ],
    [],
  );
  return (
    <>
      <Modal visible={isVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.ModalHeaderText}>
              {toggleValue ? t('SELECT SUBSCRIPTION') : 'SELECT SUBSCRIPTION'}
            </Text>
            <Divider color="grey" width={3} />
            <RadioGroup
              radioButtons={toggleValue ? arRadioButtons : radioButtons}
              onPress={id => setSubPlaneId(id)}
              selectedId={subsPlaneId}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
                <Text>{toggleValue ? t('Close') : 'Close'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Details')}
                style={styles.modalProceedBtn}>
                <Text>{toggleValue ? t('Proceed') : 'Proceed'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: width - 40,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  ModalHeaderText: {
    color: '#999999',
  },
  modalButtons: {
    flexDirection: 'row',
    padding: 10,

    justifyContent: 'space-around',
  },
  modalCloseBtn: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: '#ff6b01',
  },
  modalProceedBtn: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: '#ff6b01',
    backgroundColor: '#ff6b01',
  },
});

export default SubscriptionModel;
