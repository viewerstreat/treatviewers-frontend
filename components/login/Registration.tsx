import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { COLOR_BLACK, COLOR_WHITE, COLOR_GREY, COLOR_BROWN } from '../../utils/constants'
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useAppDispatch, useAppSelector } from '../../redux/useTypedSelectorHook';
import { RootState } from '../../redux/store';
import { CreateUser } from '../../services/Services';
import { userRegLogState } from '../../redux/userSlice';
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
            CreateUser({
                email: data.email,
                name: data.name,
                phone: data.phone,
                profilePic: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="
            }).then(response=>{
                if(!!response){
                    console.log(response);
                    
                    dispatch(userRegLogState({value: 1, phone: data.phone}))
                }
            }).catch(err=>{
                console.log(err.response.data);
                
            })
        }
      }
      useEffect(()=>{
        console.log(intermidiatePhone);
        
        if(!!intermidiatePhone){
            setValue('phone', intermidiatePhone)
        }
      },[intermidiatePhone])
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
    <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
    <FeatherIcon name="arrow-right-circle" size={50} color={COLOR_WHITE} />
    </TouchableOpacity>
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