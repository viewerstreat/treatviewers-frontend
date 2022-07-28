import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLOR_BLACK, COLOR_RED, COLOR_WHITE, INR_SYMBOL} from '../../utils/constants';

interface ContestProps {
  title: string;
  prizeVale: number;
  entryFee: number;
  prizeRatio: string;
  onclick: () => void;
}

function ContestDtls(props: ContestProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.titleStyle}>{props.title}</Text>
      <View style={styles.txtWrapper}>
        <Text style={styles.smallTxt}>Prize Value: {INR_SYMBOL}100</Text>
        <Text style={styles.smallTxt}>Entry Fee: {INR_SYMBOL}10</Text>
        <Text style={styles.smallTxt}>Prize Ratio: {props.prizeRatio}</Text>
      </View>
      <View style={styles.txtWrapper}>
        <Text style={styles.smallTxt}>Prize Value: {INR_SYMBOL}100</Text>
        <Text style={styles.smallTxt}>Entry Fee: {INR_SYMBOL}10</Text>
        <Text style={styles.smallTxt}>Prize Ratio: {props.prizeRatio}</Text>
      </View>
      <View style={styles.txtWrapper}>
        <Text style={styles.smallTxt}>Prize Value: {INR_SYMBOL}100</Text>
        <Text style={styles.smallTxt}>Entry Fee: {INR_SYMBOL}10</Text>
        <Text style={styles.smallTxt}>Prize Ratio: {props.prizeRatio}</Text>
      </View>
      <View style={styles.txtWrapper}>
        <Text style={styles.smallTxt}>Prize Value: {INR_SYMBOL}100</Text>
        <Text style={styles.smallTxt}>Entry Fee: {INR_SYMBOL}10</Text>
        <Text style={styles.smallTxt}>Prize Ratio: {props.prizeRatio}</Text>
      </View>
      <View style={styles.txtWrapper}>
        <Text style={styles.smallTxt}>Prize Value: {INR_SYMBOL}100</Text>
        <Text style={styles.smallTxt}>Entry Fee: {INR_SYMBOL}10</Text>
        <Text style={styles.smallTxt}>Prize Ratio: {props.prizeRatio}</Text>
      </View>
      <View style={styles.txtWrapper}>
        <Text style={styles.smallTxt}>Prize Value: {INR_SYMBOL}100</Text>
        <Text style={styles.smallTxt}>Entry Fee: {INR_SYMBOL}10</Text>
        <Text style={styles.smallTxt}>Prize Ratio: {props.prizeRatio}</Text>
      </View>

      <View style={styles.btnWrapper}>
        <TouchableOpacity onPress={props.onclick} style={styles.btn}>
          <Text style={styles.btnTxt}>Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 30,
    backgroundColor: COLOR_WHITE,
  },
  titleStyle: {
    width: '90%',
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: '600',
    color: COLOR_BLACK,
  },
  txtWrapper: {
    marginTop: 50,
    width: '90%',
    alignSelf: 'center',
  },
  smallTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: COLOR_BLACK,
  },
  btnWrapper: {
    marginTop: 80,
    alignItems: 'center',
  },
  btn: {
    width: 180,
    height: 50,
    borderRadius: 5,
    backgroundColor: COLOR_RED,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontSize: 16,
    color: COLOR_WHITE,
  },
});

export default ContestDtls;
