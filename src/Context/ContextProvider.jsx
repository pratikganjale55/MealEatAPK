import axios from 'axios';
import React, {createContext, useState} from 'react';

export const MealContext = createContext();

const ContextProvider = ({children}) => {
  const [subData, setUserSubData] = useState({});
  const [subsPlaneId, setSubPlaneId] = useState();
  const [detailsData, setDetailsData] = useState({});
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [custmFoodObj, setCustmFoodObj] = useState({});
  const [userSubscriptionsData, setUserSubscriptionData] = useState({});
  const [qty, setQty] = useState(1);
  const [customePrice, setCustomePrice] = useState(0);
  const [extraFood, setExtraFood] = useState([]);
  const [addCstmFood, setAddCstmFood] = useState({});
  const [subIdFromDB, setSubIdDB] = useState();
  const [toggleValue, setToggleValue] = useState(false); 
  const [position, setPosition] = useState(0);
  const [selectedTime, setSelectedTime] = useState("lunch"); 



  const handleSubmitDetails = navigation => {
    // console.log(subData);
    setDetailsData({
      subsPlaneId,
      selectedDays,
      selectedDate,
      planeId: subData.id,
      mealType: subData.mealType,
      price: subData.price,
      qty: qty,
      selectedTime : selectedTime ,
      title: subData.title,
    });
    navigation.navigate('Customization');
    // console.log(detailsData);
  };
  const handleConfirmCustome = async navigation => {
    try {
      setDetailsData({
        ...detailsData,
        custmFoodObj: custmFoodObj,
      });

      setUserSubscriptionData({...userSubscriptionsData, detailsData});
      console.log('after custome', userSubscriptionsData);
       navigation.navigate("AllDetails");
      // navigation.navigate('Address');
    } catch (error) {
      console.log('postDetailsError', error);
    }
  };

  const handleCstmConfirmProceed = async(navigation) => {
    try {
      const res = await fetch("https://weak-gray-drill-yoke.cyclic.cloud/extraFood",{
         method : "POST" ,
         headers : {
           "Content-Type" : "application/json",
           Accept : "application/json",
           "Access-Control-Allow-Origin" : "*" ,
           "Access-Control-Allow-Credentials" : false ,
           "Access-Control-Allow-Methods" : "GET" ,
           "Access-Control-Allow-Headers" : "Origin, OPTIONS, X-Requested-With, Content-Type, Accept"
         },
         body : JSON.stringify(addCstmFood)
       })
 
       const data = await res.json() ;
      //  console.log("extraFdAllDetails", extraFdAllDetails)
       navigation.navigate("Payment")
       console.log("repoonse while post user data", data)
     } catch (error) {
       console.log('post user subs details', error);
       navigation.navigate("Payment")
     }
    // navigation.navigate('Payment');
  };
  return (
    <>
      <MealContext.Provider
        value={{
          subData,
          setUserSubData,
          subsPlaneId,
          setSubPlaneId,
          detailsData,
          setDetailsData,
          handleSubmitDetails,
          setSelectedDays,
          setSelectedDate,
          selectedDays,
          selectedDate,
          setCustmFoodObj,
          custmFoodObj,
          handleConfirmCustome,
          setQty,
          qty,
          setUserSubscriptionData,
          userSubscriptionsData,
          setCustomePrice,
          customePrice,
          setExtraFood,
          extraFood,
          setAddCstmFood,
          addCstmFood,
          handleCstmConfirmProceed,
          subIdFromDB,
          setSubIdDB,
          setToggleValue ,
          toggleValue ,
          setPosition,
          position ,
          setSelectedTime,
          selectedTime
        }}>
        {children}
      </MealContext.Provider>
    </>
  );
};

export default ContextProvider;
