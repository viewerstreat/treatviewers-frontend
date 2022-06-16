import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {COLOR_BLACK, COLOR_RED} from '../../utils/constants';

interface YourResultDataType {
  title: string;
  rank: number;
  timeTaken: number;
  correctAns: number;
  totalQues: number;
  earning: number;
}
const data: YourResultDataType[] = [
  {
    title: '102 years of bengali film industry',
    rank: 552,
    timeTaken: 435,
    correctAns: 9,
    totalQues: 10,
    earning: 24,
  },
  {
    title: '102 years of bengali film industry',
    rank: 552,
    timeTaken: 435,
    correctAns: 9,
    totalQues: 10,
    earning: 24,
  },
  {
    title: '102 years of bengali film industry',
    rank: 552,
    timeTaken: 435,
    correctAns: 9,
    totalQues: 10,
    earning: 24,
  },
];

function YourResults() {
  const _renderItem = ({item}: {item: YourResultDataType}) => (
    <View style={styles.resultCard}>
      <Text style={styles.titleTxt}>{item.title}</Text>
    </View>
  );
  return (
    <View style={styles.yourResultWrapper}>
      <FlatList data={data} renderItem={_renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  yourResultWrapper: {
    paddingHorizontal: 20,
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
    fontSize: 40,
    color: COLOR_BLACK,
  },
});

export default YourResults;
