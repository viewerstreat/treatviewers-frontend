import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR_BROWN, COLOR_RED} from '../../utils/constants';
import OngoingContestSection from './OngoingContestSection';

function FeedScreen() {
  return (
    <LinearGradient
      colors={[COLOR_RED, COLOR_BROWN, COLOR_RED]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <OngoingContestSection />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedScreen;
