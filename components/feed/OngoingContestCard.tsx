import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {OngoingContest} from '../../redux/reducer';

interface OngoingContestCardProps {
  data: OngoingContest;
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
          <TouchableOpacity style={styles.btnWrapper} onPress={onClick}>
            <AntIcon name="rightcircleo" size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.timeRemainingTxt}>
        <Text>Time Remaining: {props.data.timeRemaining}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFA',
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
    fontWeight: 'bold',
  },
  tableWrapper: {
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    marginTop: 15,
  },
  tableCell1: {
    // backgroundColor: 'red',
    width: '42%',
  },
  tableCell2: {
    // backgroundColor: 'blue',
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
    // backgroundColor: 'red',
  },
  btnWrapper: {
    // backgroundColor: 'blue',
  },
  timeRemainingTxt: {
    backgroundColor: '#F83836',
    borderRadius: 5,
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
});

export default OngoingContestCard;