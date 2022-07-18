import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FeedStackParamList} from '../feed/FeedScreen';

type Props = NativeStackScreenProps<FeedStackParamList, 'MovieDetails'>;
function MovieDetails(props: Props) {
  return (
    <View style={styles.container}>
      <Text>Movie Details</Text>
      <Text>{props.route.params._id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MovieDetails;
