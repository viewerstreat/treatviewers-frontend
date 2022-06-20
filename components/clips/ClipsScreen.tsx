import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import VideoPlayer, {VideoParams} from './VideoPlayer';
import {PATH_FULLSCREEN} from '../../utils/constants';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function ClipsScreen(props: Props) {
  const onPress = (params: VideoParams) => {
    props.navigation.push(PATH_FULLSCREEN, params);
  };

  const videoUrl = '../../assets/movie.mp4';
  const posterUrl = 'https://baconmockup.com/300/200/';

  return (
    <View style={styles.container}>
      <VideoPlayer
        onFullScreen={onPress}
        videoParams={{isLocalAsset: true, localVideo: require(videoUrl), posterUrl}}
        style={{}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ClipsScreen;
