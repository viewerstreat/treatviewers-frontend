import React, {useRef, useState} from 'react';
import {View, Text, Dimensions, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {OngoingCarouselData} from '../../redux/ongoingCarouselSlice';
import {RootState} from '../../redux/store';
import {useAppSelector} from '../../redux/useTypedSelectorHook';
import {COLOR_RED, COLOR_WHITE, PATH_MOVIE_DETAILS} from '../../utils/constants';
import {FeedStackParamList} from './FeedScreen';

const {width: screenWidth} = Dimensions.get('window');
type Props = StackNavigationProp<FeedStackParamList, 'FeedScreen'>;

function OngoingCarousel() {
  const navigation = useNavigation<Props>();
  const {values} = useAppSelector((state: RootState) => state.ongoingCarousel);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<any>(null);

  const clickViewDetails = (index: number) => {
    console.log('pressed view details', index, values);
    const val = values[index];
    console.log('opening movie details page', val);
    navigation.navigate(PATH_MOVIE_DETAILS, {_id: val._id});
  };

  const _renderItem = ({item, index}: {item: OngoingCarouselData; index: number}) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => clickViewDetails(index)}>
          <Image source={{uri: item.imageUrl}} style={styles.image} />
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>
              Time Remaining: {item.timeRemaining}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth * 0.7}
        data={values}
        renderItem={_renderItem}
        onSnapToItem={index => setActiveSlide(index)}
        loop={true}
        autoplay={true}
        autoplayInterval={4000}
      />
      <Pagination
        dotsLength={values.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  h1Txt: {
    backgroundColor: '#FFFFFA',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10,
    marginBottom: 10,
  },
  item: {
    width: screenWidth * 0.7,
    height: screenWidth * 0.8,
  },
  image: {
    height: '90%',
    resizeMode: 'contain',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    color: COLOR_WHITE,
  },
  paginationContainer: {
    backgroundColor: COLOR_WHITE,
    paddingTop: 5,
    paddingBottom: 5,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLOR_RED,
  },
});

export default OngoingCarousel;
