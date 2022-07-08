import { View, Text, StyleSheet, TouchableOpacity, Image, ToastAndroid } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { COLOR_BLACK, COLOR_BROWN, COLOR_GREY, COLOR_WHITE } from '../../utils/constants'
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Controller, useForm } from 'react-hook-form';
import { GenerateOTP } from '../../services/Services';
import { useAppDispatch } from '../../redux/useTypedSelectorHook';
import { userRegLogState } from '../../redux/userSlice';

const LoginForm = ({}:LoginFormProps) => {
    const dispatch = useAppDispatch();
    const {
        register,
        control,
        setValue,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
      } = useForm<any>({
        mode: 'all',
      });
      const onSubmit=(data:any)=>{
        if(!!data.phone && data.phone.length == 10){
            GenerateOTP(data).then(RES=>{
                dispatch(userRegLogState({value: 1, phone: data.phone}))
            }).catch(err=>{
                if(err.response.status == 404){
                    dispatch(userRegLogState({value: 2, phone: data.phone}))
                }
            })
        }else{
            ToastAndroid.show('Invalid Phone Number',3000)
        }
      }
  return (
    <View style={styles.container}>
        <View style={styles.textInputContainer}>
        <Controller
        name='phone'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
            <TextInput onChangeText={onChange} 
            value={value}
            onBlur={onBlur}
            selectionColor={COLOR_BLACK} textAlign={'center'} 
            style={[styles.textInput]} maxLength={10} keyboardType={'number-pad'} 
            placeholder={'Phone Number'} ></TextInput>
        )} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <FeatherIcon name="arrow-right-circle" size={50} color={COLOR_WHITE} />
        </TouchableOpacity>
        <View style={{marginTop: 30, flexDirection:'row'}}>
        <TouchableOpacity style={styles.socialButton}>
            <FeatherIcon name="facebook" size={30} color={COLOR_WHITE} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
            <AntIcon name="google" size={30} color={COLOR_WHITE} />
        </TouchableOpacity>
        </View>
    </View>
  )
}

export default LoginForm
interface LoginFormProps {
}
const styles = StyleSheet.create({
    container:{
      justifyContent:'center',
      alignItems:'center',
      width:'100%',
      marginBottom: 80
    },
    textInputContainer:{
        height: 45,
        backgroundColor: COLOR_WHITE,
        width: '70%',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: COLOR_GREY
        
    },
    textInput:{
        fontSize: 18,
        textAlign: 'center',
        flex: 1,
        color:COLOR_BROWN
    },
    button: {
        marginTop: 20
    },
    socialButton:{
        borderWidth: 4,
        borderColor: COLOR_WHITE,
        padding:2,
        borderRadius: 5,
        margin: 15
    }
  })