import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

export interface MovieDetailsRouteParams {
  _id: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetails'>;
function MovieDetails(props: Props) {
  console.log('movie details route params _id', props.route.params._id);
  return (
    <View style={styles.container}>
      <Text>Movie Details</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MovieDetails;
