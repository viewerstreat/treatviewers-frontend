import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import OngoingContestSection from './OngoingContestSection';
import {COLOR_BROWN, COLOR_RED, PATH_FEED_SCREEN, PATH_MOVIE_DETAILS} from '../../utils/constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieDetails from '../movie/MovieDetails';

export interface MovieDetailsRouteParams {
  _id: string;
}

export type FeedStackParamList = {
  [PATH_FEED_SCREEN]: undefined;
  [PATH_MOVIE_DETAILS]: MovieDetailsRouteParams;
};

const FeedStack = createNativeStackNavigator<FeedStackParamList>();
const noHeader = () => null;

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

function FeedStackScreen() {
  return (
    <View style={styles.container}>
      <FeedStack.Navigator initialRouteName={PATH_FEED_SCREEN}>
        <FeedStack.Screen
          name={PATH_FEED_SCREEN}
          options={{header: noHeader}}
          component={FeedScreen}
        />
        <FeedStack.Screen
          name={PATH_MOVIE_DETAILS}
          options={{header: noHeader}}
          component={MovieDetails}
        />
      </FeedStack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedStackScreen;
