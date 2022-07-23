import { View, Text } from 'react-native'
import React, { useState } from 'react'
import ProfileTopSection from './ProfileTopSection'
import Faviouraties from './Faviouraties'
import { COLOR_BROWN, COLOR_RED } from '../../utils/constants'
import Achievements from './Achievements'
import Settings from './Settings'
import LinearGradient from 'react-native-linear-gradient'

const ProfileContainer = () => {
  const[section, SetSelection]=useState<number>(1)
  return (
    <View style={{flex: 1}}>
        <View style={{height: '35%'}}>
            <ProfileTopSection OnSelectedItem={SetSelection} SelectionItem={section} />
        </View>
        <LinearGradient
      colors={[COLOR_RED, COLOR_BROWN, COLOR_RED]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{height: '65%'}}>
                  {
            section == 1 ?
            <Faviouraties  />:
            section == 2 ?
            <Achievements /> :
            <Settings />
          }
      </LinearGradient>           
    </View>
  )
}

export default ProfileContainer