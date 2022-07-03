import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { COLOR_BLACK, COLOR_BROWN, COLOR_GREY, COLOR_WHITE } from '../../utils/constants'
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';

const LoginForm = ({ButtonClick}:LoginFormProps) => {
  return (
    <View style={styles.container}>
        <View style={styles.textInputContainer}>
            <TextInput selectionColor={COLOR_BLACK} maxLength={10} textAlign={'center'} style={styles.textInput} keyboardType={'number-pad'} placeholder={'Phone Number'}></TextInput>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>ButtonClick()}>
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
    ButtonClick?: any;
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