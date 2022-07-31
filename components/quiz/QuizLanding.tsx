import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../definitions/navigation';
import {
  FetchContestById,
  GetPlayTracker,
  GetWalletBalance,
  PayForContest,
  SaveAnswer,
  StartPlay,
} from '../../services/backend';
import {showMessage} from '../../services/misc';
import {COLOR_BROWN} from '../../utils/constants';
import ContestDtls from './ContestDtls';
import {ContestSchema} from '../../definitions/contest';
import {BtnState, PlayTrackerSchema, PLAY_STATUS} from '../../definitions/quiz';
import TopSection from './TopSection';
import Question from './Question';
import ProgressIndicator from './ProgressIndicator';
import Score from './Score';
import Details from './Details';

type Props = NativeStackScreenProps<RootStackParamList, 'QuizLanding'>;
function QuizLanding(props: Props) {
  const [showBackBtn, setShowBackBtn] = useState(true);
  const [showTimer, setShowTimer] = useState(false);
  const [showContest, setShowContest] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);
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
      if (data.data.status !== PLAY_STATUS.FINISHED) {
        setShowContest(true);
      } else {
        setShowBackBtn(false);
        setShowScore(true);
      }
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
      const tq = playTracker?.totalQuestions || 0;
      const ta = playTracker?.totalAnswered || 0;
      if (ta < tq) {
        setShowQuestion(true);
      }
    } catch (err) {
      showMessage('Unable to process request at this time');
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async (questionNo: number, optionId: number) => {
    console.log('submitAnswer on landing', optionId);
    setLoading(true);
    try {
      if (!contest?._id) {
        return;
      }
      const {data} = await SaveAnswer(contest._id, questionNo, optionId);
      if (!data) {
        throw new Error('Unknown error');
      }
      setPlayTracker(data.data);
      const tq = data.data.totalQuestions;
      const ta = data.data.totalAnswered;
      if (ta < tq) {
        setShowQuestion(true);
      } else {
        setShowQuestion(false);
        setShowTimer(false);
      }
    } catch (err) {
      showMessage('Not able to save answer');
    } finally {
      setLoading(false);
    }
  };

  const onViewDetails = () => {
    setShowDetails(true);
    setShowScore(false);
    setShowBackBtn(true);
    setShowContest(false);
    setShowQuestion(false);
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
      <ProgressIndicator
        show={showTimer}
        totalQ={playTracker?.totalQuestions}
        totalA={playTracker?.totalAnswered}
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
        <Question
          showQuestion={showQuestion}
          contestId={contest?._id}
          currQuestionNo={playTracker?.currQuestionNo}
          submitAnswer={submitAnswer}
        />
        <Score
          showScore={showScore}
          playStatus={playTracker?.status}
          score={playTracker?.score}
          startTs={playTracker?.startTs}
          finishTs={playTracker?.finishTs}
          total={playTracker?.totalQuestions}
          onViewDetails={onViewDetails}
          onBackToFeed={onClickBackBtn}
        />

        <Details
          showDetails={showDetails}
          answers={playTracker?.answers || []}
          onBack={onClickBackBtn}
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