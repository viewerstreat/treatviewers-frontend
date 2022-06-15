import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {OngoingContestsData} from '../../redux/ongoingContestsSlice';
import {COLOR_BLACK, COLOR_BROWN, COLOR_WHITE} from '../../utils/constants';

interface OngoingContestCardProps {
  data: OngoingContestsData;
}

function OngoingContestCard(props: OngoingContestCardProps) {
  const onClick = () => {
    console.log('onClick pressed');
  };
  return (
    <View style={styles.card}>
      <Text style={styles.h2Txt}>{props.data.title}</Text>
      <View style={styles.tableWrapper}>
        <View style={styles.tableCell1}>
          <Text style={styles.smallTxt}>Sponsored By</Text>
          <Text style={styles.bigTxt}>{props.data.sponsoredBy}</Text>
        </View>
        <View style={styles.tableCell2}>
          <Text style={styles.smallTxt}>Top Prize: {props.data.topPrize}</Text>
          <Text style={styles.smallTxt}>Entry Fee: {props.data.entryFee}</Text>
          <Text style={styles.smallTxt}>Prize Ratio: {props.data.prizeRatio}</Text>
        </View>
        <View style={styles.iconWrapper}>
          <TouchableOpacity onPress={onClick}>
            <AntIcon name="rightcircleo" size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.timeRemainingTxt}>
        <Text style={styles.whiteTxt}>Time Remaining: {props.data.timeRemaining}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLOR_WHITE,
    marginVertical: 15,
    width: '85%',
    alignSelf: 'center',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  h2Txt: {
    textAlign: 'center',
    fontSize: 18,
    color: COLOR_BLACK,
  },
  tableWrapper: {
    flexDirection: 'row',
    marginTop: 15,
  },
  tableCell1: {
    width: '42%',
  },
  tableCell2: {
    width: '42%',
  },
  smallTxt: {
    paddingVertical: 2,
  },
  bigTxt: {
    fontSize: 16,
  },
  iconWrapper: {
    width: '16%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeRemainingTxt: {
    backgroundColor: COLOR_BROWN,
    borderRadius: 5,
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    color: COLOR_WHITE,
  },
  whiteTxt: {
    color: COLOR_WHITE,
  },
});

export default OngoingContestCard;
