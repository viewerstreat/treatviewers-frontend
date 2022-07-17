import { View, Text } from 'react-native'
import React, { useState } from 'react'
import ProfileTopSection from './ProfileTopSection'
import Faviouraties from './Faviouraties'
import { COLOR_RED } from '../../utils/constants'
import Achievements from './Achievements'
import Settings from './Settings'

const ProfileContainer = () => {
  const[section, SetSelection]=useState<number>(1)
  return (
    <View style={{flex: 1}}>
        <View style={{height: '35%'}}>
            <ProfileTopSection OnSelectedItem={SetSelection} SelectionItem={section} />
        </View>
        <View style={{height: '65%', backgroundColor: COLOR_RED}}>
          {
            section == 1 ?
            <Faviouraties  />:
            section == 2 ?
            <Achievements /> :
            <Settings />
          }
           
        </View>
    </View>
  )
}

export default ProfileContainer