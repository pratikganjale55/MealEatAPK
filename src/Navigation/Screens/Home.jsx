import React, {useEffect, useRef, useState, useContext} from 'react';
import {
  Animated,
  Button,
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import i18n from '../../Translation/i18n';
import {useTranslation} from 'react-i18next';
import {MealContext} from '../../Context/ContextProvider';
import CircleExpander from '../../CircleExpander';
import MealScheduleTab from '../../MealScheduleTab';
import scrollImgData from "../../../assets/data/ScrollImgData" ;

const para =
  "Healthier you needs all of the essential carbs, vitamins and protein. Mothers are careful to cook you variety of vegetables and daal. MealEat makes sure you don't miss the most cooked homely meals all across India.";
const {width} = Dimensions.get('window');

const Home = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [imgRotate, setImgRotate] = useState(false);
  const {toggleValue} = useContext(MealContext);
  console.log(toggleValue);

  const {t} = useTranslation();
  const handlePress = () => {
    setImgRotate(!imgRotate);
  };
  useEffect(() => {
    Animated.spring(scrollX, {
      toValue: scrollImgData.length - 1,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.imageCarousel}>
          <FlatList
            data={scrollImgData}
            renderItem={({item, i}) => (
              <View style={styles.ImgView} key={i}>
                <Image source={{uri : item.img}} style={styles.EachImg} />
                <Text style={styles.title}>
                  {toggleValue ? t(item.title) : item.title}
                </Text>
              </View>
            )}
            horizontal={true}
            pagingEnabled={true}
            keyExtractor={item => item.id.toString()}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            showsHorizontalScrollIndicator={false}
          />
          <View style={styles.indicatorContainer}>
            {scrollImgData.map((image, imgIndex) => {
              const Dotwidth = scrollX.interpolate({
                inputRange: [
                  width * (imgIndex - 1),
                  width * imgIndex,
                  width * (imgIndex + 1),
                ],
                outputRange: [8, 16, 8],
                extrapolate: 'clamp',
              });
              // console.log("Dotwidth", Dotwidth);
              return (
                <Animated.View
                  style={[styles.normalDots, {width: Dotwidth}]}
                  keyExtractor={imgIndex}
                />
              );
            })}
          </View>
        </View>
        <View style={styles.middleSection}>
          <View>
            <Text style={styles.headText}>
              {toggleValue
                ? t('EVERYDAY CHANGING MENU')
                : 'EVERYDAY CHANGING MENU'}
            </Text>
          </View>
          <View>
            <Text style={styles.paraText}>{toggleValue ? t(para) : para}</Text>
          </View>
        </View>
        <View style={styles.reviewSection}>
          <View style={styles.titleOfTimeMeal}>
            <Text style={styles.AllTimeMeal}>
              {toggleValue ? t('Meal of All Time') : 'Meal of All Time'}
            </Text>
          </View>
          <View style={styles.scheduleImages}>
            <CircleExpander />
          </View>
        </View>
        <View style={styles.ScheduleContainer}>
          <View style={[styles.titleOfTimeMeal, styles.mealPlaneCon]}>
            <Text style={styles.AllTimeMeal}>
              {toggleValue ? t('Meal Schedule') : 'Meal Schedule'}
            </Text>
          </View>
          <MealScheduleTab />
        </View>
      </ScrollView>
    </>
  );
};



const styles = StyleSheet.create({
  zoomImg: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  imageCarousel: {
    flex: 2,
    marginBottom: 20,
  },
  ImgView: {
    width: width,
    height: null,
    padding: 10,
  },
  EachImg: {
    flex: 1,
    width: width,
    height: 500,
    resizeMode: 'cover',
  },
  title: {
    position: 'absolute',
    bottom: 15,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    padding: 5,
    textAlign: 'center',
    fontSize: 18,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  normalDots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#ff6b01',
  },

  middleSection: {
    flex: 1,
    padding: 10,
    marginBottom: 20,
  },
  headText: {
    color: '#040c17',
    lineHeight: 24,
  },
  paraText: {
    color: '#999999',
    lineHeight: 24,
  },
  reviewSection: {
    flex: 1,

    justifyContent: 'center',
    // borderWidth: 1,
    alignItems: 'center',
  },
  titleOfTimeMeal: {
    width: width - 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 10,
    ...Platform.select({
      shadowColor: 'rgba(100, 100, 111, 0.2)',
      android: {
        elevation: 7,
      },
    }),
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  AllTimeMeal: {
    textAlign: 'center',
    fontSize: 20,
    color: '#ff6b01',
    fontWeight: 'bold',
  },
  image: {
    width: '25%',
    height: 200,
    resizeMode: 'contain',
  },
  ScheduleContainer: {
    justifyContent: 'center',
  },
  mealPlaneCon: {
    marginLeft: 10,
  },
  scheduleModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  scheduleModalImage: {
    padding: 10,
    resizeMode: 'contain',
  },
  scheduleImages: {
    flex: 1,
    width: width - 20,
    height: 400,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  image1: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
  },
  imageMargin: {
    marginHorizontal: 10,
  },
});
export default Home;
