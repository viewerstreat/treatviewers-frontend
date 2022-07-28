import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {useAppDispatch, useAppSelector} from '../../redux/useTypedSelectorHook';
import VideoPlayer, {VideoParams} from './VideoPlayer';
import {COLOR_RED, PATH_FULLSCREEN} from '../../utils/constants';
import {loadClips} from '../../redux/clipsSlice';

function LoaderIcon({loading}: {loading: boolean}) {
  if (loading) {
    return <ActivityIndicator color={COLOR_RED} size="large" />;
  }
  return <></>;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
function ClipsScreen(props: Props) {
  const dispatch = useAppDispatch();
  const {loading, values} = useAppSelector(state => state.clips);

  useEffect(() => {
    dispatch(loadClips());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPress = (params: VideoParams) => {
    props.navigation.push(PATH_FULLSCREEN, params);
  };

  return (
    <View style={styles.container}>
      <LoaderIcon loading={loading} />
      {values.map(el => (
        <VideoPlayer
          key={el._id}
          onFullScreen={onPress}
          videoParams={{isLocalAsset: false, videoUrl: el.videoUrl, posterUrl: el.bannerImageUrl}}
          style={{}}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ClipsScreen;
