import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import OctiIcon from 'react-native-vector-icons/Octicons';
import {COLOR_RED, COLOR_WHITE} from '../../utils/constants';

interface TopSectionProps {
  showBack?: boolean;
  showTimer?: boolean;
  onClickBack?: () => void;
  totalQuestions?: number;
  totalAnswered?: number;
  playStartTs?: number;
}

function TimerText(props: {time: number}) {
  const hours = Math.floor(props.time / 3600);
  const hr = props.time % 3600;
  const mins = Math.floor(hr / 60);
  const secs = hr % 60;
  const hs = hours > 9 ? hours : '0' + hours;
  const ms = mins > 9 ? mins : '0' + mins;
  const ss = secs > 9 ? secs : '0' + secs;
  if (hours > 0) {
    return (
      <Text style={styles.bigTxt}>
        {hs}:{ms}:{ss}
      </Text>
    );
  }
  return (
    <Text style={styles.bigTxt}>
      {ms}:{ss}
    </Text>
  );
}

function TopSection(props: TopSectionProps) {
  const [time, setTime] = useState(0);

  const getRemaining = () => {
    const tq = props.totalQuestions || 0;
    const ta = props.totalAnswered || 0;
    const r = tq - ta;
    return `${r}/${tq}`;
  };

  useEffect(() => {
    if (!props.showTimer || !props.playStartTs) {
      return;
    }
    const currTime = new Date().getTime();
    const elapsed = Math.floor((currTime - props.playStartTs) / 1000);
    setTime(elapsed);
    const intervalId = setInterval(() => {
      setTime(ct => ct + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [props.playStartTs, props.showTimer]);

  const backBtn = () => {
    if (!props.showBack) {
      return <></>;
    }
    return (
      <TouchableOpacity onPress={props.onClickBack}>
        <AntIcon name="back" size={30} color={COLOR_RED} />
      </TouchableOpacity>
    );
  };

  const timer = () => {
    if (!props.showTimer) {
      return <></>;
    }
    return (
      <View style={styles.row}>
        <Text style={styles.txt}>
          <Text style={styles.bigTxt}>{getRemaining()}</Text> remaining
        </Text>
        <View style={[styles.row, styles.leftAuto]}>
          <OctiIcon name="clock" size={30} color={COLOR_WHITE} />
          <TimerText time={time} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      {backBtn()}
      {timer()}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 60,
  },
  img: {
    height: 25,
    width: 35,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftAuto: {marginLeft: 'auto'},
  txt: {
    fontSize: 16,
    color: COLOR_WHITE,
  },
  bigTxt: {
    fontSize: 20,
    color: COLOR_WHITE,
  },
});

export default TopSection;
