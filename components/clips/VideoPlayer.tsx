import React, {useState, useRef} from 'react';
import {View, Platform} from 'react-native';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import Video, {OnLoadData, OnProgressData} from 'react-native-video';
import {COLOR_RED} from '../../utils/constants';

export interface VideoParams {
  isLocalAsset: boolean;
  videoUrl?: string;
  localVideo?: any;
  posterUrl: string;
}

interface VideoPlayerProps {
  videoParams: VideoParams;
  onFullScreen: (params: VideoParams) => void;
  style: {[k: string]: string | number};
}

const VideoPlayer = (props: VideoPlayerProps) => {
  const videoPlayer = useRef<Video>(null);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
  const [isLoading, setIsLoading] = useState(true);

  // This function is triggered when the user released the player slider.
  const onSeek = (seek: number) => {
    if (videoPlayer?.current) {
      videoPlayer.current.seek(seek);
    }
  };

  // This function is triggered when the user interact with the player slider.
  const onSeeking = (currentVideoTime: number) => setCurrentTime(currentVideoTime);

  // This function is triggered when the play/pause button is pressed.
  const onPaused = (newState: number) => {
    setPaused(newState === PLAYER_STATES.PAUSED);
    setPlayerState(newState);
  };

  // This function is triggered when the replay button is pressed.
  // There is a minmial bug on Android devices that does not allow the player to replay the video
  // if changing the state to PLAYING, so we have to use the 'Platform' to fix that.
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

  // This function is triggered while the video is playing.
  const onProgress = (data: OnProgressData) => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  // This function is called when the video is loaded.
  const onLoad = (data: OnLoadData) => {
    setDuration(Math.round(data.duration));
    setIsLoading(false);
  };

  // This function is called when the video loading starts
  const onLoadStart = () => {
    setIsLoading(true);
  };

  // This function is triggered when the player reaches the end of the media.
  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    setCurrentTime(duration);
  };

  const onFullScreen = () => {
    const params: VideoParams = {
      isLocalAsset: props.videoParams.isLocalAsset,
      localVideo: props.videoParams.localVideo,
      videoUrl: props.videoParams.videoUrl,
      posterUrl: props.videoParams.posterUrl,
    };
    props.onFullScreen(params);
  };

  const videoStyle = {
    width: '100%',
    height: 250,
    ...props.style,
  };

  return (
    <View>
      <Video
        ref={videoPlayer}
        source={
          props.videoParams.isLocalAsset
            ? props.videoParams.localVideo
            : {uri: props.videoParams.videoUrl}
        }
        poster={props.videoParams.posterUrl}
        paused={paused}
        onLoadStart={onLoadStart}
        onLoad={onLoad}
        onProgress={onProgress}
        onEnd={onEnd}
        posterResizeMode={'cover'}
        resizeMode={'cover'}
        controls={false}
        hideShutterView={true}
        style={videoStyle}
      />
      <MediaControls
        isFullScreen={false}
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
        sliderStyle={{containerStyle: {}, thumbStyle: {}, trackStyle: {}}}>
        <MediaControls.Toolbar>
          <View />
        </MediaControls.Toolbar>
      </MediaControls>
    </View>
  );
};

export default VideoPlayer;
