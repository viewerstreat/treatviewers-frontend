import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLOR_BROWN, COLOR_GREY, COLOR_LIGHT_BROWN, COLOR_RED, COLOR_WHITE } from '../../utils/constants'
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useAppSelector } from '../../redux/useTypedSelectorHook';
import { RootState } from '../../redux/store';
const ProfileTopSection = ({OnSelectedItem,SelectionItem}:ProfileTopProps) => {
  const {user_detail} = useAppSelector((state: RootState) => state.userState);
  return (
    <View style={[{flex: 1,borderStartColor: COLOR_WHITE},styles.container]}>
        <View style={{height: '20%', justifyContent:'flex-end', alignItems:'flex-end', width: '100%', marginRight: 10, flexDirection: 'row'}}>
            <Text style={styles.UidText}> UID: {user_detail?.id}</Text>
          <TouchableOpacity onPress={()=>{}}>
            <FeatherIcon name="copy" size={25} color={COLOR_RED} />
          </TouchableOpacity>
        </View>
        <View style={{height: '45%'}}>
        <View style={styles.profilePictureContainer}>
        <Image
          style={styles.image}
          source={{
            uri:
              'https://st.depositphotos.com/1779253/5140/v/600/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg',
          }}></Image>
      </View>
    </View>
      <View style={{height: '10%'}}>
            <Text style={styles.UidText}> {user_detail?.name}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly',alignItems: 'center', width: '100%',height: '25%'}}>
            <ToggleButton text={'Faviourites'} id={1} press={OnSelectedItem} SelectionItem={SelectionItem} />
            <ToggleButton text={'Achievements'} id={2} press={OnSelectedItem} SelectionItem={SelectionItem} />
            <ToggleButton text={'Settings'} id={3} press={OnSelectedItem} SelectionItem={SelectionItem} />
        </View>
    </View>
  )
}

export default ProfileTopSection
const styles = StyleSheet.create({
    container:{
     justifyContent: 'center',
     alignItems: 'center'
    },
    profilePictureContainer: {
        borderRadius: 60,
        alignSelf: 'center',
        zIndex: 9000,
      },
      image: {
        height: 100,
        width: 100,
        borderRadius: 51,
      },
      UidText:{
        fontSize: 16,
        fontWeight: '600',
        marginRight: 10,
        color: COLOR_BROWN
      },
      ToggleButton: {
        padding: 5,
        borderRadius: 10,
        width: 110,
        justifyContent: 'center',
        alignItems: 'center',
      }
  })
  const ToggleButton=(props: any)=>{
    return(
        <TouchableOpacity style={[styles.ToggleButton,{backgroundColor: props.id == props.SelectionItem ? COLOR_BROWN : COLOR_LIGHT_BROWN}]} onPress={()=> props.press(props.id)}>
            <Text style={{color: COLOR_WHITE, fontWeight: '500'}}> {props.text}</Text>
        </TouchableOpacity>
    )
  }

  interface ProfileTopProps {
    SelectionItem?: number;
    OnSelectedItem?: any;
  }