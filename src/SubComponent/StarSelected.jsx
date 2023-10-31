import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StarSelected = ({starIndex}) => {
  const [index, setIndex] = useState()
  // const [starSelected, setSelectedStar] = useState(new Array(5).fill(false));

  // const toggleStar = index => {
  //   console.log('index >>', index);
  //   const updatedStarSelected = [...starSelected];
  //   for (let i = 0; i <= index; i++) {
  //     updatedStarSelected[i] = !updatedStarSelected[i];
  //   }
  //   setSelectedStar(updatedStarSelected);
  // };
  const onPress = (starIndex) => {
    setIndex(starIndex)
    console.log("selected id >>>" , index)
  }
   console.log("starIndex", starIndex)
  return (
    <>
      <TouchableOpacity onPress={() => onPress(starIndex)}>
        <Ionicons
          name={starIndex < index  ? 'star' : 'star-outline'}
          size={14}
          style={{color: starIndex < index ? '#FF9529' : 'gray'}}
        />
      </TouchableOpacity>
    </>
  );
};

export default StarSelected;
