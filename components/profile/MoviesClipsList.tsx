import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLOR_GREY, COLOR_RED, COLOR_WHITE } from '../../utils/constants'

const MoviesClipsList = () => {
    const[n, sn]=useState<number[]>([1,2,1,3,4,5])
  return (
    <View style={{flexDirection: 'row',justifyContent: 'center', flexWrap:'wrap', marginHorizontal: 30, marginTop: 20}}>
      
      {n.map((item, index)=>(
        <View key={index} style={{width: '33.3%',justifyContent: 'center',alignItems: 'center', marginVertical: 10}}>
            <ImageBackground style={{height: 100, width: 100, backgroundColor: COLOR_WHITE}} source={{uri:'https://akamaividz2.zee5.com/image/upload/w_504,h_756,c_scale,f_webp,q_auto:eco/resources/0-0-1z5149022/portrait/1920x770b8ff06d785f14c4f9e1a2460331c752b.jpg'}}>
            </ImageBackground>
            <View>
                <Text style={{color: COLOR_WHITE,fontWeight: '600'}}>Aparajito</Text>
            </View>
        </View>
      ))
}
    </View>
  )
}

export default MoviesClipsList