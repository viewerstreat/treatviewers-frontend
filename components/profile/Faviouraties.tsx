import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { COLOR_BROWN, COLOR_GREY, COLOR_LIGHT_BROWN, COLOR_RED, COLOR_WHITE } from '../../utils/constants'
import MoviesClipsList from './MoviesClipsList';


const Faviouraties = () => {
  const[faviourite,Setfaviourite]=useState<number>(1);
  return (
    <View style={{flex: 1}}>
      <View style={{justifyContent:'center',alignItems:'center', height: 50}}>
        <Text style={{fontWeight: '600', color: COLOR_WHITE}}>Recently Added</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center',alignItems: 'center', width: '100%'}}>
            <ToggleButton text={'Movies'} id={1} press={Setfaviourite} SelectionItem={faviourite} />
            <View style={{width: 2,height:15, backgroundColor: COLOR_GREY,marginRight: 20}}></View>
            <ToggleButton text={'Clips'} id={2} press={Setfaviourite} SelectionItem={faviourite} />
        </View>
        <ScrollView style={{flex: 1}}>
          {
            faviourite == 1 ?
            <MoviesClipsList />:
            <MoviesClipsList />
          }
        </ScrollView>
    </View>
  )
}

export default Faviouraties

const styles = StyleSheet.create({
    ToggleButton: {
      padding: 5,
      borderRadius: 10,
      width: 80,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 20
    }
})
const ToggleButton=(props: any)=>{
  return(
      <TouchableOpacity style={[styles.ToggleButton,{backgroundColor: props.id == props.SelectionItem ? COLOR_GREY : COLOR_RED}]} onPress={()=> props.press(props.id)}>
          <Text style={{color: COLOR_WHITE, fontWeight: '500'}}> {props.text}</Text>
      </TouchableOpacity>
  )
}