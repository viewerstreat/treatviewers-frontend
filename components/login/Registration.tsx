import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { COLOR_BLACK, COLOR_WHITE, COLOR_GREY, COLOR_BROWN } from '../../utils/constants'
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useAppDispatch, useAppSelector } from '../../redux/useTypedSelectorHook';
import { RootState } from '../../redux/store';
import { CreateUser } from '../../services/Services';
import { errorUpdate, loadingUpdate, userRegLogState } from '../../redux/userSlice';
const Registration = () => {
    const dispatch = useAppDispatch();
    const {intermidiatePhone} = useAppSelector((state: RootState) => state.userState);
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
        if(!!data){
            if(!data.name){
                ToastAndroid.show('Name required.',3000)
            }else if(!!data.email && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) ){
                ToastAndroid.show('Invalid email.',3000)
            }else{
                dispatch(loadingUpdate(true));
                CreateUser({
                    email: data.email,
                    name: data.name,
                    phone: data.phone,
                }).then(response=>{
                    dispatch(loadingUpdate(false));
                    if(!!response){
                        dispatch(userRegLogState({value: 1, phone: data.phone}))
                    }
                }).catch(err=>{
                    dispatch(loadingUpdate(false));
                    dispatch(errorUpdate(err?.response?.data?.message))
                    
                })
            }
        }
      }
      useEffect(()=>{
        if(!!intermidiatePhone){
            setValue('phone', intermidiatePhone)
        }
      },[intermidiatePhone])
      const back=()=>{
        dispatch(userRegLogState({value: 0, phone: undefined}))
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
        editable={false}
        onBlur={onBlur}
        selectionColor={COLOR_BLACK} textAlign={'center'} 
        style={[styles.textInput]} maxLength={10} keyboardType={'number-pad'} 
        placeholder={'Phone Number'} ></TextInput>
    )} />
    </View>
    <View style={styles.textInputContainer}>
    <Controller
    name='email'
    control={control}
    render={({ field: { onChange, onBlur, value } }) => (
        <TextInput onChangeText={onChange} 
        value={value}
        onBlur={onBlur}
        selectionColor={COLOR_BLACK} textAlign={'center'} 
        style={[styles.textInput]}
        placeholder={'Email (Optional)'} ></TextInput>
    )} />
    </View>
    <View style={styles.textInputContainer}>
    <Controller
    name='name'
    control={control}
    render={({ field: { onChange, onBlur, value } }) => (
        <TextInput onChangeText={onChange} 
        value={value}
        onBlur={onBlur}
        selectionColor={COLOR_BLACK} textAlign={'center'} 
        style={[styles.textInput]}
        placeholder={'Name'} ></TextInput>
    )} />
    </View>
    <View style={{flexDirection: 'row',width: '100%', justifyContent: 'space-around'}}>
    <TouchableOpacity style={styles.button} onPress={()=>back()}>
    <FeatherIcon name="arrow-left-circle" size={50} color={COLOR_WHITE} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
    <FeatherIcon name="arrow-right-circle" size={50} color={COLOR_WHITE} />
    </TouchableOpacity>
    </View>
</View>
  )
}

export default Registration
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
        borderColor: COLOR_GREY,
        marginBottom: 10
        
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