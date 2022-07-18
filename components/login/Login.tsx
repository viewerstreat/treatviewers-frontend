import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import LoginForm from './LoginForm'
import LoginOTP from './LoginOTP'
import { useFocusEffect } from '@react-navigation/native'
import Registration from './Registration'
import { useAppDispatch, useAppSelector } from '../../redux/useTypedSelectorHook'
import { RootState } from '../../redux/store'
import { userRegLogState } from '../../redux/userSlice'

const Login = () => {
  const dispatch = useAppDispatch();
  const {loginState} = useAppSelector((state: RootState) => state.userState);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(userRegLogState(0))
    },[]))
  return (
      <ImageBackground style={styles.container} imageStyle= 
      {{opacity:0.9}} source={require('../../images/bg.png')}>
        {
          loginState == 1 ?
          <LoginOTP />:
          loginState == 2 ?
          <Registration />:
          <LoginForm />
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