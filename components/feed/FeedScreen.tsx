import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import OngoingCarousel from './OngoingCarousel';
import InviteFriend from './InviteFriend';

function FeedScreen() {
  return (
    <LinearGradient
      colors={['#F83836', '#182A46']}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 1}}
      style={styles.container}>
      <OngoingCarousel />
      <InviteFriend />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedScreen;
