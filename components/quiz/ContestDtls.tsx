import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PLAY_STATUS} from '../../definitions/quiz';
import {COLOR_BLACK, COLOR_GREY, COLOR_RED, COLOR_WHITE, INR_SYMBOL} from '../../utils/constants';
import {getRatio} from '../../utils/utils';
import Loader from './Loader';

interface ContestProps {
  loading: boolean;
  title: string;
  prizeValue: number | undefined;
  entryFee: number | undefined;
  prizeRatioNum: number | undefined;
  prizeRatioDen: number | undefined;
  playStatus: string | undefined;
  endTime: number | undefined;
  onclick: () => void;
}

function ContestDtls(props: ContestProps) {
  const getBtnText = (): string => {
    if (props.playStatus === PLAY_STATUS.INIT && props.entryFee && props.entryFee > 0) {
      return `Pay ${INR_SYMBOL}${props.entryFee}`;
    }
    if (props.playStatus === PLAY_STATUS.INIT && !props.entryFee) {
      return 'Play';
    }
    if (props.playStatus === PLAY_STATUS.PAID) {
      return 'Play';
    }
    if (props.playStatus === PLAY_STATUS.STARTED) {
      return 'Resume';
    }
    if (props.playStatus === PLAY_STATUS.FINISHED || props.playStatus === PLAY_STATUS.ENDED) {
      return 'Play';
    }
    return '';
  };

  const currTime = () => new Date().getTime();
  const isDisabled = (): boolean => {
    if (
      props.playStatus === PLAY_STATUS.ENDED ||
      props.playStatus === PLAY_STATUS.FINISHED ||
      (props.endTime && props.endTime < currTime())
    ) {
      return true;
    }
    return false;
  };

  const btnClick = () => {
    if (isDisabled()) {
      return;
    }
    props.onclick();
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.titleStyle}>{props.title}</Text>
      <View style={styles.txtWrapper}>
        <Text style={styles.smallTxt}>
          Prize Value: {props.prizeValue ? `${INR_SYMBOL}${props.prizeValue}` : ''}
        </Text>
        <Text style={styles.smallTxt}>
          Entry Fee:{' '}
          {props.entryFee ? (
            `${INR_SYMBOL}${props.entryFee}`
          ) : (
            <Text style={styles.free}>FREE</Text>
          )}
        </Text>
        <Text style={styles.smallTxt}>
          Prize Ratio: {getRatio(props.prizeRatioNum, props.prizeRatioDen)}
        </Text>
      </View>

      <View style={styles.btnWrapper}>
        {props.loading ? (
          <Loader loading={props.loading} />
        ) : (
          <TouchableOpacity
            onPress={btnClick}
            style={[styles.btn, {backgroundColor: isDisabled() ? COLOR_GREY : COLOR_RED}]}>
            <Text style={styles.btnTxt}>{getBtnText()}</Text>
          </TouchableOpacity>
        )}
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
  free: {
    fontSize: 20,
    color: COLOR_RED,
    fontWeight: '600',
  },
  btnWrapper: {
    marginTop: 80,
    alignItems: 'center',
  },
  btn: {
    width: 180,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontSize: 16,
    color: COLOR_WHITE,
  },
});

export default ContestDtls;
