import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import OngoingContestSection from './OngoingContestSection';

function FeedScreen() {
  return (
    <LinearGradient
      colors={['#F83836', '#182A46']}
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