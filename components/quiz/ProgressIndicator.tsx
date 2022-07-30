import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLOR_WHITE, COLOR_YELLOW} from '../../utils/constants';

interface ProgressIndicatorProps {
  show: boolean;
  totalQ: number | undefined;
  totalA: number | undefined;
}

function ProgressIndicator(props: ProgressIndicatorProps) {
  if (!props.show) {
    return <></>;
  }
  const width = Math.round(((props.totalA || 0) / (props.totalQ || 1)) * 100);
  return (
    <View style={styles.wrapper}>
      <View style={[styles.bar, {width: `${width}%`}]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: COLOR_WHITE,
  },
  bar: {
    backgroundColor: COLOR_YELLOW,
    height: 1,
  },
});

export default ProgressIndicator;
