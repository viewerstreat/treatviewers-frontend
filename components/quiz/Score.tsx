import React from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PLAY_STATUS} from '../../definitions/quiz';
import {
  COLOR_BLACK,
  COLOR_BROWN,
  COLOR_RED,
  COLOR_WHITE,
  COLOR_YELLOW,
} from '../../utils/constants';

const windowHeight = Dimensions.get('window').height;
type StrOrUndefined = string | undefined;
type NumOrUndefined = number | undefined;

interface ScoreProps {
  showScore: boolean;
  playStatus: StrOrUndefined;
  score: NumOrUndefined;
  total: NumOrUndefined;
  startTs: NumOrUndefined;
  finishTs: NumOrUndefined;
  onViewDetails: () => void;
  onBackToFeed: () => void;
}

const getTimeTaken = (start: NumOrUndefined, finish: NumOrUndefined): string => {
  const s = start || 0;
  const f = finish || 0;
  if (!start || !finish) {
    return '';
  }
  let t = Math.floor((f - s) / 1000);
  const h = Math.floor(t / 3600);
  t = h % 3600;
  const m = Math.floor(t / 60);
  const sec = t % 60;
  let str = h > 0 ? `${h}hrs ` : '';
  str = m > 0 ? `${str}${m}mins ` : str;
  str = `${str}${sec}secs`;
  return str;
};

function Score(props: ScoreProps) {
  if (!props.showScore || props.playStatus !== PLAY_STATUS.FINISHED) {
    return <></>;
  }
  return (
    <View style={styles.wrapper}>
      <Text style={styles.yay}>Yay!</Text>
      <MatIcon name="hand-clap" size={40} color={COLOR_YELLOW} />
      <Text style={styles.congrats}>Congratulations!</Text>
      <Text style={styles.congrats}>You have successfully completed the quiz.</Text>
      <Text style={styles.scoreTxt}>You scored</Text>
      <Text style={styles.score}>
        {props.score}/{props.total}
      </Text>
      <Text style={styles.timeTaken}>
        Time taken: {getTimeTaken(props.startTs, props.finishTs)}
      </Text>
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.btn} onPress={props.onViewDetails}>
          <Text style={styles.btnTxt}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={props.onBackToFeed}>
          <Text style={styles.btnTxt}>Back To Feed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLOR_WHITE,
    paddingTop: 60,
    paddingBottom: 50,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    minHeight: windowHeight * 0.7,
  },
  yay: {
    fontSize: 24,
    color: COLOR_BLACK,
  },
  congrats: {
    color: COLOR_BLACK,
    width: '50%',
    textAlign: 'center',
  },
  scoreTxt: {
    marginTop: 50,
    fontSize: 20,
    color: COLOR_BLACK,
  },
  score: {
    fontSize: 24,
    color: COLOR_BROWN,
  },
  timeTaken: {},
  btnWrapper: {
    marginTop: 'auto',
  },
  btn: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_RED,
    borderRadius: 10,
    marginBottom: 10,
  },
  btnTxt: {
    fontSize: 16,
    color: COLOR_WHITE,
  },
});

export default Score;
