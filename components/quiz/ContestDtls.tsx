import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions, Alert, TouchableOpacity} from 'react-native';
import {PRIZE_SELECTION} from '../../definitions/contest';
import {BtnState, PLAY_STATUS} from '../../definitions/quiz';
import {
  COLOR_BLACK,
  COLOR_RED,
  COLOR_RED_GREYED,
  COLOR_WHITE,
  INR_SYMBOL,
} from '../../utils/constants';
import {getRatio} from '../../utils/utils';
import Loader from './Loader';

type StrOrUndefined = string | undefined;
type NumOrUndefined = number | undefined;
interface ContestProps {
  showContest: boolean;
  loading: boolean;
  title: string;
  prizeValue: NumOrUndefined;
  entryFee: NumOrUndefined;
  prizeSelection: StrOrUndefined;
  topWinnersCount: NumOrUndefined;
  prizeRatioNum: NumOrUndefined;
  prizeRatioDen: NumOrUndefined;
  playStatus: StrOrUndefined;
  endTime: NumOrUndefined;
  onclick: (state: BtnState) => void;
}

const windowHeight = Dimensions.get('window').height;
const currTime = () => new Date().getTime();
const PAY_CONFIRM_TITLE = 'PAYMENT CONFIRMATION';
const getPayConfirmMsg = (entryFee: number) =>
  `Amount ${INR_SYMBOL}${entryFee} will be deducted from your wallet.`;

function ContestDtls(props: ContestProps) {
  const [btnState, setBtnState] = useState<BtnState>('START');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    switch (props.playStatus) {
      case PLAY_STATUS.INIT:
        setBtnState(props.entryFee && props.entryFee > 0 ? 'PAY' : 'START');
        setDisabled(!!(props.endTime && props.endTime <= currTime()));
        break;

      case PLAY_STATUS.PAID:
        setBtnState('START');
        setDisabled(!!(props.endTime && props.endTime <= currTime()));
        break;

      case PLAY_STATUS.STARTED:
        setBtnState('RESUME');
        setDisabled(!!(props.endTime && props.endTime <= currTime()));
        break;

      default:
        setBtnState('START');
        setDisabled(true);
    }
  }, [props.endTime, props.entryFee, props.playStatus]);

  const getBtnText = (): string => {
    return btnState === 'PAY'
      ? `Pay ${INR_SYMBOL}${props.entryFee}`
      : btnState === 'RESUME'
      ? 'Resume'
      : 'Play';
  };

  const btnClick = () => {
    console.log('btnClick');
    if (disabled) {
      return;
    }
    if (btnState === 'PAY') {
      Alert.alert(
        PAY_CONFIRM_TITLE,
        getPayConfirmMsg(props.entryFee || 0),
        [
          {
            text: 'PAY',
            onPress: () => props.onclick(btnState),
          },
        ],
        {
          cancelable: true,
        },
      );
      return;
    }

    props.onclick(btnState);
  };

  const renderEntryFee = () => {
    if (props.entryFee) {
      return <>Entry Fee: {`${INR_SYMBOL}${props.entryFee}`}</>;
    }

    return (
      <>
        Entry Fee: <Text style={styles.free}>FREE</Text>
      </>
    );
  };

  const renderPrizeRatio = () => {
    if (props.prizeSelection === PRIZE_SELECTION.RATIO_BASED) {
      return (
        <Text style={styles.smallTxt}>
          Winner Ratio: {getRatio(props.prizeRatioNum, props.prizeRatioDen)}
        </Text>
      );
    }
    return <Text style={styles.smallTxt}>No of Winners: {props.topWinnersCount}</Text>;
  };

  const renderButtons = () => {
    return (
      <View style={styles.btnWrapper}>
        {props.loading ? (
          <Loader loading={props.loading} />
        ) : (
          <TouchableOpacity
            onPress={btnClick}
            style={[styles.btn, {backgroundColor: disabled ? COLOR_RED_GREYED : COLOR_RED}]}>
            <Text style={styles.btnTxt}>{getBtnText()}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (!props.showContest) {
    return <></>;
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.titleStyle}>{props.title}</Text>
      <View style={styles.txtWrapper}>
        <Text style={styles.smallTxt}>
          Prize Value: {props.prizeValue ? `${INR_SYMBOL}${props.prizeValue}` : ''}
        </Text>
        <Text style={styles.smallTxt}>{renderEntryFee()}</Text>
        <>{renderPrizeRatio()}</>
      </View>
      <>{renderButtons()}</>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 30,
    backgroundColor: COLOR_WHITE,
    minHeight: windowHeight * 0.6,
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
    fontSize: 16,
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
