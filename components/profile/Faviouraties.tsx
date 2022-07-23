import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, FlatList } from 'react-native'
import React, { useState } from 'react'
import { COLOR_BLACK, COLOR_BROWN, COLOR_GREY, COLOR_LIGHT_BROWN, COLOR_RED, COLOR_WHITE } from '../../utils/constants'
import MoviesClips from './MoviesClips';
import { useFocusEffect } from '@react-navigation/native';
import { FaviouriteGet } from '../../services/Services';
import { useAppDispatch, useAppSelector } from '../../redux/useTypedSelectorHook';
import { RootState } from '../../redux/store';
import { errorUpdate, Faviourites, FavouritesUpdate, loadingUpdate } from '../../redux/userSlice';
import { pageSizeFavourite } from '../../utils/config';


const Faviouraties = () => {
  const[faviourite,Setfaviourite]=useState<number>(1);
  const[pageIndex,SetpageIndex]=useState<number>(0);
  const[hasdata,Sethasdata]=useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {faviourites} = useAppSelector((state: RootState) => state.userState);
  useFocusEffect(
    React.useCallback(() => {
      SetpageIndex(0);
      Sethasdata(false);
      dispatch(loadingUpdate(true));      
      FaviouriteGet({
        mediaType: faviourite == 1 ? 'movie':'clip',
        pageIndex: 0,
        pageSize: pageSizeFavourite
      }).then(response=>{
        if(!!response.data?.data){
          if(response.data.data.length > 0){
            dispatch(FavouritesUpdate(response.data.data));
            Sethasdata(true);
          }
          dispatch(loadingUpdate(false));
        }
      }).catch(error=>{
        dispatch(errorUpdate(error?.response?.data?.message))
        dispatch(loadingUpdate(false));
      })
    }, [faviourite]),
  );

  const fatchMoreData=()=>{  
    if(hasdata){
      dispatch(loadingUpdate(true));
      FaviouriteGet({
        mediaType: faviourite == 1 ? 'movie':'clip',
        pageIndex: pageIndex + 1 ,
        pageSize: pageSizeFavourite
      }).then(response=>{
        if(!!response.data?.data){   
          if(response.data.data.length > 0){
            dispatch(FavouritesUpdate([...faviourites, ...response.data.data]));
          }else{
            Sethasdata(false)
          }
          dispatch(loadingUpdate(false));
        }
      }).catch(error=>{
        dispatch(errorUpdate(error?.response?.data?.message))
        dispatch(loadingUpdate(false));
      })
      SetpageIndex(pageIndex + 1)
    }
  }
  const ItemClick=(item: Faviourites)=>{
    console.log(item);
    
  }
  return (
    <View style={{flex: 1, marginTop: 15}}>
      <View style={{flexDirection: 'row',marginBottom: 5, justifyContent: 'center',alignItems: 'center', width: '100%'}}>
            <ToggleButton text={'Movies'} id={1} press={Setfaviourite} SelectionItem={faviourite} />
            <View style={{width: 2,height:15, backgroundColor: COLOR_GREY,marginRight: 20}}></View>
            <ToggleButton text={'Clips'} id={2} press={Setfaviourite} SelectionItem={faviourite} />
        </View>
        {
          faviourites.length > 0 &&
          <FlatList
          style={{flex: 1}}
           data={faviourites}
           onEndReached={() =>fatchMoreData()}
           numColumns={3}
           onEndReachedThreshold={1.2}
           keyExtractor={(key) => key.mediaId.toString()}
           renderItem={(item) => (
             <MoviesClips ItemClick={ItemClick} key={item.index} item={item.item} />
           )}
         />
        }
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