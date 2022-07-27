import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity, StyleSheet} from 'react-native';
import {COLOR_WHITE} from '../../utils/constants';
import {FaviouriteSchema} from '../../definitions/user';

interface itemProps {
  item: FaviouriteSchema;
  ItemClick?: any;
}

const MoviesClips = ({item, ItemClick}: itemProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => ItemClick(item)}>
        <ImageBackground style={styles.img} source={{uri: item.bannerImageUrl}} />
      </TouchableOpacity>
      <View>
        <Text style={styles.txt}>{item.mediaName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '33.3%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  img: {
    height: 100,
    width: 100,
    backgroundColor: COLOR_WHITE,
  },
  txt: {
    color: COLOR_WHITE,
    fontWeight: '600',
  },
});

export default MoviesClips;
