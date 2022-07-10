import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLOR_GREY, COLOR_RED, COLOR_WHITE } from '../../utils/constants'
import Accounts from './Accounts';
import Payments from './Payments';
import { useAppDispatch } from '../../redux/useTypedSelectorHook';
import { userLogout } from '../../redux/userSlice';

const Settings = () => {
  const[settings,Setsettings]=useState<number>(1);
  const dispatch = useAppDispatch();
  const Logout=()=>{
    dispatch(userLogout())
  }
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{width: '30%', flexDirection: 'column', justifyContent: 'center',alignItems: 'center', height: '100%'}}>
      <ToggleButton text={'Account'} id={1} press={Setsettings} SelectionItem={settings} />
      <ToggleButton text={'Payment'} id={2} press={Setsettings} SelectionItem={settings} />
      <ToggleButton text={'Logout'} id={3} press={(id: any)=>(Setsettings(id),Logout())} SelectionItem={settings} />
      </View>
      <View style={{width: '70%'}}>
        {
          settings == 1 ?
          <Accounts />:
          settings == 2 &&
          <Payments />
        }
      </View>
    </View>
  )
}

export default Settings
const styles = StyleSheet.create({
  ToggleButton: {
    padding: 5,
    borderRadius: 10,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  }
})
const ToggleButton=(props: any)=>{
return(
    <TouchableOpacity style={[styles.ToggleButton,{backgroundColor: props.id == props.SelectionItem ? COLOR_GREY : COLOR_RED}]} onPress={()=> props.press(props.id)}>
        <Text style={{color: COLOR_WHITE, fontWeight: '500'}}> {props.text}</Text>
    </TouchableOpacity>
)
}