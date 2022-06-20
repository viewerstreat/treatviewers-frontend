import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Dimensions, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {COLOR_RED, COLOR_WHITE} from '../../utils/constants';
import ENTRIES1 from '../../__mock__/entriesData.json';

interface ItemPropType {
  title: string;
  timeRemaining: string;
  imageUrl: string;
}

const {width: screenWidth} = Dimensions.get('window');
function OngoingCarousel() {
  const [entries, setEntries] = useState([] as ItemPropType[]);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<any>(null);

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  const clickViewDetails = (index: number) => {
    console.log('pressed view details', index);
  };

  const _renderItem = ({item, index}: {item: ItemPropType; index: number}) => {
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
        itemWidth={screenWidth * 0.6}
        data={entries}
        renderItem={_renderItem}
        onSnapToItem={index => setActiveSlide(index)}
        loop={true}
        autoplay={true}
        autoplayInterval={4000}
      />
      <Pagination
        dotsLength={entries.length}
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
