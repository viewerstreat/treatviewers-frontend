import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Orientation from 'react-native-orientation-locker';
import {RootStackParamList} from '../../App';
import VideoPlayer from './VideoPlayer';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function ClipsScreen(props: Props) {
  Orientation.lockToPortrait();

  const onPress = () => {
    props.navigation.push('Fullscreen');
  };

  return (
    <View style={{flex: 1}}>
      <VideoPlayer onFullScreen={onPress} />
      <TouchableOpacity onPress={onPress}>
        <Text>Full Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ClipsScreen;
