import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../definitions/navigation';
import {FetchContestById, GetPlayTracker} from '../../services/backend';
import {showMessage} from '../../services/misc';
import {COLOR_BROWN} from '../../utils/constants';
import BackButton from './BackButton';
import Loader from './Loader';
import ContestDtls from './ContestDtls';
import {ContestSchema} from '../../definitions/contest';
import {PlayTrackerSchema} from '../../definitions/quiz';

type Props = NativeStackScreenProps<RootStackParamList, 'QuizLanding'>;
function QuizLanding(props: Props) {
  const [showBackBtn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [contest, setContest] = useState<ContestSchema | null>(null);
  const [playTracker, setPlayTracker] = useState<PlayTrackerSchema | null>(null);

  const getContestDetails = async (contestId: string) => {
    try {
      const {data} = await FetchContestById(contestId);
      if (!data.success || data.data.length === 0) {
        showMessage('Not able to get contest details');
        return;
      }
      setContest(data.data[0]);
    } catch (err: any) {
      console.log(err);
      console.log(err?.response?.data);
      showMessage('Not able to get contest details');
    }
  };

  const getPlayTracker = async (contestId: string) => {
    try {
      const {data} = await GetPlayTracker(contestId);
      if (!data.success) {
        showMessage('Not able to get play tracker');
      }
      setPlayTracker(data.data);
    } catch (err: any) {
      console.log(err);
      console.log(err?.response?.data);
      showMessage('Not able to get play tracker');
    }
  };

  const loadData = async () => {
    const {contestId} = props.route.params;
    if (!contestId) {
      showMessage('Error: contestId is required');
      return;
    }
    setLoading(true);
    await Promise.all([getContestDetails(contestId), getPlayTracker(contestId)]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickBackBtn = () => {
    console.log('onClickBackBtn');
  };

  const onClickPlay = () => {
    console.log('onClickPlay');
  };

  return (
    <View style={styles.container}>
      <BackButton onclick={onClickBackBtn} showBtn={showBackBtn} />
      <ScrollView style={styles.wrapper}>
        <ContestDtls
          loading={loading}
          title={props.route.params.title}
          prizeValue={contest?.prizeValue}
          entryFee={contest?.entryFee}
          prizeRatioNum={contest?.prizeRatioNumerator}
          prizeRatioDen={contest?.prizeRatioDenominator}
          endTime={contest?.endTime}
          playStatus={playTracker?.status}
          onclick={onClickPlay}
        />
        <Loader loading={loading} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BROWN,
    padding: 20,
  },
  wrapper: {
    marginTop: 30,
    flex: 1,
  },
});

export default QuizLanding;
