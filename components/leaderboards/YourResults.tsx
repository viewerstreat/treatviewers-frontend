import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {COLOR_BLACK, COLOR_GREEN, COLOR_RED} from '../../utils/constants';
import {formatTimeTaken} from '../../utils/utils';

interface YourResultDataType {
  key: number;
  title: string;
  rank: number;
  timeTaken: number;
  correctAns: number;
  totalQues: number;
  earning: number;
  badgesWon: boolean;
}
const data: YourResultDataType[] = [
  {
    key: 1,
    title: '102 years of bengali film industry',
    rank: 552,
    timeTaken: 435,
    correctAns: 9,
    totalQues: 10,
    earning: 24,
    badgesWon: false,
  },
  {
    key: 2,
    title: '102 years of bengali film industry',
    rank: 552,
    timeTaken: 435,
    correctAns: 9,
    totalQues: 10,
    earning: 24,
    badgesWon: true,
  },
  {
    key: 3,
    title: '102 years of bengali film industry',
    rank: 552,
    timeTaken: 435,
    correctAns: 9,
    totalQues: 10,
    earning: 24,
    badgesWon: true,
  },
];

function NoBadge() {
  return <Text style={styles.noBadgeTxt}>No Badges Earned</Text>;
}

function WonBandge() {
  return (
    <View style={styles.wonBandgeWrapper}>
      <Text style={styles.wonTxt}>Won</Text>
      <FontAwesomeIcon name="medal" size={30} color={COLOR_GREEN} />
    </View>
  );
}

function YourResults() {
  const _renderItem = (item: YourResultDataType) => (
    <View key={item.key} style={styles.resultCard}>
      <Text style={styles.titleTxt}>{item.title}</Text>
      <View style={styles.row}>
        <View style={styles.col1}>
          <Text>Your Rank: {item.rank}</Text>
          <Text>Time Taken: {formatTimeTaken(item.timeTaken)}</Text>
          <Text>
            Correct: {item.correctAns}/{item.totalQues}
          </Text>
          <Text>You Earned: {item.earning}</Text>
        </View>
        <View style={styles.col2}>{item.badgesWon ? <WonBandge /> : <NoBadge />}</View>
      </View>
    </View>
  );
  return (
    <>
      <Text style={styles.h1Txt}>Your Results</Text>
      <View style={styles.yourResultWrapper}>{data.map(item => _renderItem(item))}</View>
    </>
  );
}

const styles = StyleSheet.create({
  yourResultWrapper: {
    paddingHorizontal: 20,
  },
  h1Txt: {
    fontSize: 24,
    paddingVertical: 10,
    textAlign: 'center',
    color: COLOR_BLACK,
  },
  resultCard: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: COLOR_RED,
    borderRadius: 10,
  },
  titleTxt: {
    textAlign: 'center',
    fontSize: 20,
    color: COLOR_BLACK,
  },
  row: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  col1: {
    width: '60%',
  },
  col2: {
    width: '40%',
    justifyContent: 'center',
  },
  noBadgeTxt: {
    color: COLOR_RED,
    width: 80,
    fontSize: 16,
  },
  wonBandgeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  wonTxt: {
    color: COLOR_RED,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default YourResults;
