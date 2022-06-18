import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Platform, Dimensions, BackHandler, StatusBar} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import Video, {OnLoadData, OnProgressData} from 'react-native-video';
import Orientation, {LANDSCAPE, OrientationLocker} from 'react-native-orientation-locker';
import {COLOR_RED} from '../../utils/constants';
import {RootStackParamList} from '../../App';

const screenHeight = Dimensions.get('screen').height;
// const screenWidth = Dimensions.get('screen').width;

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function FullscreenVideo(props: Props) {
  StatusBar.setHidden(true, 'none');
  const video = require('../../assets/oceans.mp4');
  const videoPlayer = useRef<Video>(null);
  // Orientation.lockToLandscape();

  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(true);

  const [currentTime, setCurrentTime] = useState(0);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
  const [isLoading, setIsLoading] = useState(true);

  const onSeek = (seek: number) => {
    if (videoPlayer?.current) {
      videoPlayer.current.seek(seek);
    }
  };
  const onSeeking = (currentVideoTime: number) => setCurrentTime(currentVideoTime);
  const onPaused = (newState: number) => {
    setPaused(!paused);
    setPlayerState(newState);
  };
  const onReplay = () => {
    if (videoPlayer?.current) {
      videoPlayer.current.seek(0);
    }
    setCurrentTime(0);
    if (Platform.OS === 'android') {
      setPlayerState(PLAYER_STATES.PAUSED);
      setPaused(true);
    } else {
      setPlayerState(PLAYER_STATES.PLAYING);
      setPaused(false);
    }
  };
  const onProgress = (data: OnProgressData) => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };
  const onLoad = (data: OnLoadData) => {
    setDuration(Math.round(data.duration));
    setIsLoading(false);
  };
  const onLoadStart = () => setIsLoading(true);
  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    setCurrentTime(duration);
  };
  // const [isFullScreen, setIsFullScreen] = useState(false);
  const onFullScreen = () => {
    StatusBar.setHidden(false, 'slide');
    Orientation.lockToPortrait();
    props.navigation.pop();
    // if (!isFullScreen) {
    // } else {
    //   Orientation.lockToLandscape();
    // }
    // setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    const backAction = () => {
      StatusBar.setHidden(false, 'slide');
      Orientation.lockToPortrait();
      props.navigation.pop();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <OrientationLocker
        orientation={LANDSCAPE}
        onChange={orientation => console.log('onChange', orientation)}
        onDeviceChange={orientation => console.log('onDeviceChange', orientation)}
      />
      <View style={{margin: 50}}>
        <Video
          poster="https://baconmockup.com/300/200/"
          onEnd={onEnd}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          posterResizeMode={'cover'}
          onProgress={onProgress}
          paused={paused}
          ref={videoPlayer}
          resizeMode={'cover'}
          source={video}
          style={styles.backgroundVideoFullScreen}
        />
        <MediaControls
          isFullScreen={true}
          duration={duration}
          isLoading={isLoading}
          progress={currentTime}
          onFullScreen={onFullScreen}
          onPaused={onPaused}
          onReplay={onReplay}
          onSeek={onSeek}
          onSeeking={onSeeking}
          mainColor={COLOR_RED}
          playerState={playerState}
          containerStyle={{}}
          sliderStyle={{containerStyle: styles.mediaControls, thumbStyle: {}, trackStyle: {}}}>
          <MediaControls.Toolbar>
            <View />
          </MediaControls.Toolbar>
        </MediaControls>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundVideo: {
    height: screenHeight,
    width: '100%',
  },
  mediaControls: {
    width: screenHeight - 170,
    height: '100%',
    flex: 1,
    alignSelf:
      Platform.OS === 'android' ? (screenHeight < 800 ? 'center' : 'flex-start') : 'center',
  },
  backgroundVideoFullScreen: {
    height: 200,
    width: 500,
  },
});

export default FullscreenVideo;
