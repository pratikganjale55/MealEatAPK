import React, {useEffect, useState, useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {View} from 'react-native';
import Home from './Screens/Home';
import Meal from './Screens/Meal';
import MySubscription from './Screens/MySubscription';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import SubsDetails from '../SubsDetails';
import MealStack from './MealStack';
import Address from '../Address';
import Profile from './Screens/Profile';
import SplashScreen from '../SplashScreen';
import SubscriptionStack from './SubscriptionStack';
import StepIndicatorCom from '../StepIndicatorCom';
import CustomeHeader from './Screens/CustomeHeader';
import {MealContext} from '../Context/ContextProvider';
import i18n from '../Translation/i18n';
import {useTranslation} from 'react-i18next';
import changeLanguage from '../Translation/changeLanguage';
import CircleExpander from '../CircleExpander';


const Tab = createBottomTabNavigator();

const MainContainer = () => {
  const [loading, setLoading] = useState(true);
  const {toggleValue, setToggleValue} = useContext(MealContext);

  const {t} = useTranslation();
 
  const onToggleChange = () => {
    setToggleValue(!toggleValue);
    if(toggleValue) {
      changeLanguage("ar")
    }
  };
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);
  return (
    <>
      <NavigationContainer>
        {loading ? (
          <SplashScreen />
        ) : (
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName;
                let rootName = route.name;
                if (rootName === 'Home' || rootName === 'الصفحة الرئيسية') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (rootName === 'Meal' || rootName === 'وجبة') {
                  iconName = focused ? 'fast-food' : 'fast-food-outline';
                } else if (rootName === 'SubscriptionsStack' || rootName == "الاشتراكاتالمكدس") {
                  iconName = focused ? 'wallet' : 'wallet';
                } else if (rootName === 'Profile' || rootName == "حساب تعريفي") {
                  iconName = focused ? 'person' : 'person-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              headerStyle: {
                backgroundColor: '#ff6b01',
              },
              header: props => (
                <CustomeHeader
                  {...props}
                  toggleValue={toggleValue}
                  onToggleChange={onToggleChange}
                />
              ),
              headerTintColor: 'white',
              tabBarScrollEnabled: true,
            })}
            tabBarOptions={{
              tabBarScrollEnabled: true,
              activeTintColor: '#ff6b01',
              inactiveTintColor: 'grey',
              labelStyle: {paddingBottom: 10, fontSize: 14},
              style: {padding: 10, height: 70},
            }}>
            <Tab.Screen name={toggleValue ? t("Home") : "Home"} component={Home}  options={{ title:"Home" }}/>
            <Tab.Screen name={toggleValue ? t("Meal") : "Meal"} component={MealStack} />
            <Tab.Screen
              name={toggleValue ? t("SubscriptionsStack") : "SubscriptionsStack"}
              component={SubscriptionStack}
              options={{headerShown: false}}
            />
            <Tab.Screen name={toggleValue ? t("Profile") : "Profile"} component={SplashScreen} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </>
  );
};

export default MainContainer;
