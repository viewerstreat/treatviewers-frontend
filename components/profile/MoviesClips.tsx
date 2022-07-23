import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLOR_GREY, COLOR_RED, COLOR_WHITE } from '../../utils/constants'
import { Faviourites } from '../../redux/userSlice'

const MoviesClips = ({item,ItemClick}: itemProps) => {
  return (
        <View style={{width: '33.3%',justifyContent: 'center',alignItems: 'center', marginVertical: 10}}>
          <TouchableOpacity onPress={()=> ItemClick(item)}>
          <ImageBackground style={{height: 100, width: 100, backgroundColor: COLOR_WHITE}} source={{uri: item.bannerImageUrl}}>
            </ImageBackground>
          </TouchableOpacity>
            <View>
                <Text style={{color: COLOR_WHITE,fontWeight: '600'}}>{item.mediaName}</Text>
            </View>
        </View>
  )
}

export default MoviesClips
interface itemProps {
  item: Faviourites
  ItemClick?: any;
}