import React, {useContext} from 'react'
import { Text } from 'react-native'
import StepIndicatorCom from './StepIndicatorCom'
import { Button } from '@rneui/themed'
import { MealContext } from './Context/ContextProvider'
import { useTranslation } from 'react-i18next'

const Payment = ({navigation}) => {

  const {toggleValue}  = useContext(MealContext) ;
  const {t} = useTranslation() ;
  return (
    <>
      <StepIndicatorCom/>
      <Text>Payment</Text>
      <Button
            title={toggleValue ? t("Go to Subscription") : "Go to Subscription"}
            buttonStyle={{
              backgroundColor: "#ff6b01",
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 30,
            }}
            containerStyle={{
              width: 200,
              marginHorizontal: 60,
              marginVertical: 20,
            }}
            titleStyle={{ fontWeight: "bold" }}
            onPress={() => navigation.navigate("SubscriptionsStack")}
          />
    </>
  )
}

export default Payment
