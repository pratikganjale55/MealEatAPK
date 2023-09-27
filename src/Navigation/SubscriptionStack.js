import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import MySubscription from './Screens/MySubscription';
import CustomeDetails from '../CustomeDetails';
import Payment from '../Payment';

const Stack = createStackNavigator();
const SubscriptionStack = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: "#ff6b01",
          },
          headerTitleStyle: {
            color : "white",
        }
      }}>
        <Stack.Screen name="Subscription" component={MySubscription}/>
        <Stack.Screen name="CustomeDetails" component={CustomeDetails}/>
        <Stack.Screen name='Payment' component={Payment}/>
      </Stack.Navigator>
    </>
  )
}

export default SubscriptionStack
