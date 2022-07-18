import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { COLOR_BROWN, COLOR_GREY, COLOR_WHITE } from '../../utils/constants';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import { OTP_TIMER } from '../../utils/config';
import { RootState } from '../../redux/store';
import { useAppDispatch, useAppSelector } from '../../redux/useTypedSelectorHook';
import { GenerateOTP, VerifyOTP } from '../../services/Services';
import { errorUpdate, loadingUpdate, userDetailUpdate, userRegLogState } from '../../redux/userSlice';
import { updateToken } from '../../redux/tokenSlice';
const LoginOTP = ({}: LoginOTPProps) => {
  const dispatch = useAppDispatch();
  const {intermidiatePhone} = useAppSelector((state: RootState) => state.userState);
    const [otp, setOtp] = useState<string>();
    const [timer, setTimer] = useState<number>(0);
    useFocusEffect(
      React.useCallback(() => {
        if (timer > 0) {
          deductTimer();
        }
      }, [timer]),
    );
    useFocusEffect(
      React.useCallback(() => {
        setTimer(OTP_TIMER)
      },[]))
  
    const deductTimer = async () => {
      if (timer <= 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setTimer(0);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setTimer(timer - 1);
      }
    };
    const startTimer = async () => {
      setTimer(10);
    };
    const Resend=()=>{
      if(!!intermidiatePhone){
        dispatch(loadingUpdate(true));
        GenerateOTP(+intermidiatePhone).then(response=>{
          dispatch(loadingUpdate(false));
          if(!!response){
            ToastAndroid.show('OTP successfully send',3000)
          }
        }).catch(err=>{
          dispatch(loadingUpdate(false));
          dispatch(errorUpdate(err?.response?.data?.message))
        })
      }

    }
    const ChangeNumber=()=>{
      dispatch(userRegLogState({value: 0, phone: undefined}))
    }
    const VlidateOTP=()=>{
      if(!!otp && otp.length< 6){
        ToastAndroid.show('Invalid OTP.',3000)
      }else if(!!otp && !!intermidiatePhone){
        dispatch(loadingUpdate(true));
        VerifyOTP({
          otp: otp.toString(),
          phone: +intermidiatePhone
        }).then(
          response=>{   
            dispatch(loadingUpdate(false));  
            if(!!response && !!response.data){
              dispatch(userDetailUpdate(response.data.data));
              dispatch(updateToken(response.data.token));
              dispatch(userRegLogState({value: 0, phone: undefined}));
            }
          }
        ).catch(error=>{          
          dispatch(errorUpdate(error?.response?.data?.message))
          dispatch(loadingUpdate(false));
        })
        
      }
    }
  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.lableTop}>OTP has been send to {intermidiatePhone}</Text>
        </View>
         <OTPInputView
            style={{height: 100,marginLeft:10}}
            pinCount={6}
            onCodeChanged={(code) => {
                setOtp(code);
            }}
            code={otp}
            selectionColor={COLOR_WHITE}
            autoFocusOnLoad={false}
            keyboardType={'number-pad'}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
          />
          <View style={{flexDirection: 'row'}}>
          <View
          style={{
            margin: 5,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text
          style={styles.lableTop}
          >Not received OTP yet?</Text>
          <TouchableOpacity
            style={{paddingLeft: 10}}
            onPress={() => {
              if (timer <= 0) {
                setTimer(10);
                startTimer();
                Resend()
              }
            }}>
            <Text
              style={[
                styles.lableTop,
                {
                  textDecorationLine: 'underline',
                  color: timer <= 0?COLOR_WHITE: COLOR_GREY
                }
              ]}
            >Resend</Text>
            {timer > 0 && (
              <Text
                style={[
                  styles.lableTop
                ]}>
                {timer == 10 ? '00:' + timer : '00:0' + timer}
              </Text>
            )}
          </TouchableOpacity>
        </View>
          </View>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=> ChangeNumber()}>
            <Text style={[styles.lableTop,{textDecorationLine: 'underline'}]}>Change Number</Text>
          </TouchableOpacity>
           <TouchableOpacity style={styles.button} onPress={()=> VlidateOTP()}>
        <FeatherIcon name="arrow-right-circle" size={50} color={COLOR_WHITE} />
        </TouchableOpacity>
    </View>
  )
}

export default LoginOTP
const styles = StyleSheet.create({
    container:{
      justifyContent:'center',
      alignItems:'center',
      width:'75%',
      marginBottom: 80,
    },
    underlineStyleBase: {
        width: 40,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        color: COLOR_WHITE,
        fontSize: 18,
        fontWeight: 'bold',
      },
  
      underlineStyleHighLighted: {
        borderColor: COLOR_WHITE,
        color: COLOR_WHITE,
      },
      button: {
        marginTop: 20
    },
    lableTop:{
      color: COLOR_WHITE,
      fontSize: 18
    }
  })
  interface LoginOTPProps {
  }

