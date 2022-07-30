import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../definitions/navigation';
import {
  FetchContestById,
  GetPlayTracker,
  GetWalletBalance,
  PayForContest,
  StartPlay,
} from '../../services/backend';
import {showMessage} from '../../services/misc';
import {COLOR_BROWN} from '../../utils/constants';
import ContestDtls from './ContestDtls';
import {ContestSchema} from '../../definitions/contest';
import {BtnState, PlayTrackerSchema} from '../../definitions/quiz';
import TopSection from './TopSection';

type Props = NativeStackScreenProps<RootStackParamList, 'QuizLanding'>;
function QuizLanding(props: Props) {
  const [showBackBtn, setShowBackBtn] = useState(true);
  const [showTimer, setShowTimer] = useState(false);
  const [showContest, setShowContest] = useState(true);
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
    } catch (err) {
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
    } catch (err) {
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
    props.navigation.pop();
  };

  const onClickPlay = async (state: BtnState) => {
    console.log('onClickPlay', state);
    if (!contest?._id) {
      showMessage('Invalid');
      return;
    }
    try {
      setLoading(true);
      if (state === 'PAY') {
        {
          const {data} = await GetWalletBalance();
          if (!data.success || data.balance < (contest?.entryFee || 0)) {
            showMessage('Insufficient balance');
            return;
          }
        }
        const {data} = await PayForContest(contest._id);
        if (!data.success) {
          throw new Error('Unknown error');
        }
        showMessage('Payment successful!');
        setPlayTracker(data.data);
        setShowBackBtn(true);
        setShowTimer(false);
        setShowContest(true);
        return;
      }
      const {data} = await StartPlay(contest._id);
      if (!data.success) {
        throw new Error('Unknown error');
      }
      setPlayTracker(data.data);
      setShowBackBtn(false);
      setShowTimer(true);
      setShowContest(false);
    } catch (err) {
      showMessage('Unable to process request at this time');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TopSection
        showBack={showBackBtn}
        showTimer={showTimer}
        onClickBack={onClickBackBtn}
        totalQuestions={playTracker?.totalQuestions}
        totalAnswered={playTracker?.totalAnswered}
        playStartTs={playTracker?.startTs}
      />
      <ScrollView style={styles.wrapper}>
        <ContestDtls
          loading={loading}
          showContest={showContest}
          title={props.route.params.title}
          prizeValue={contest?.prizeValue}
          entryFee={contest?.entryFee}
          prizeSelection={contest?.prizeSelection}
          topWinnersCount={contest?.topWinnersCount}
          prizeRatioNum={contest?.prizeRatioNumerator}
          prizeRatioDen={contest?.prizeRatioDenominator}
          endTime={contest?.endTime}
          playStatus={playTracker?.status}
          onclick={onClickPlay}
        />
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
    flex: 1,
  },
});

export default QuizLanding;
