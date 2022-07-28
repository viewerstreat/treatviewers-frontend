import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../definitions/navigation';
import {FetchContestById} from '../../../services/backend';
import {showMessage} from '../../../services/misc';
import {COLOR_BROWN} from '../../../utils/constants';

type Props = NativeStackScreenProps<RootStackParamList, 'QuizLanding'>;
function QuizLanding(props: Props) {
  const [loading, setLoading] = useState(false);

  const [entryFee, setEntryFee] = useState(0);
  const getContestDetails = async () => {
    try {
      setLoading(true);
      if (!props.route.params.contestId) {
        return;
      }
      const {data} = await FetchContestById(props.route.params.contestId);
      if (!data.success) {
        return;
      }
      setEntryFee(data.data[0].entryFee);
    } catch (err: any) {
      console.log(err);
      console.log(err?.response?.data);
      showMessage('Not able to get contest details');
    }
  };

  const getPlayTracker = async () => {
    try {
    } catch (err: any) {
      console.log(err);
      console.log(err?.response?.data);
      showMessage('Not able to get play tracker');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Contest Id: {props.route.params.contestId}</Text>
      <Text>Contest Title: {props.route.params.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BROWN,
  },
});

export default QuizLanding;
