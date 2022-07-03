import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import LoginForm from './LoginForm'
import LoginOTP from './LoginOTP'
import { useFocusEffect } from '@react-navigation/native'

const Login = () => {
  const[loginState,SetLoginState]=useState<number>(0);
  useFocusEffect(
    React.useCallback(() => {
      SetLoginState(0)
    },[]))
  const ButtonClickGenerateOtp=()=>{
    SetLoginState(1)
  }
  const ChangeNumber=()=>{
    SetLoginState(0)
  }
  return (
      <ImageBackground style={styles.container} imageStyle= 
      {{opacity:0.9}} source={require('../../images/bg.png')}>
        {
          loginState == 1 ?
          <LoginOTP ChangeNumber={ChangeNumber}/>:
          <LoginForm ButtonClick={ButtonClickGenerateOtp} />
        }        
      </ImageBackground>
  )
}

export default Login
const styles = StyleSheet.create({
  container:{
    height: '100%',
    justifyContent:'flex-end',
    alignItems:'center',
  }
})