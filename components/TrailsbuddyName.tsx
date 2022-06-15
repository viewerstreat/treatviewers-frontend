import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLOR_RED, COLOR_WHITE} from '../utils/constants';

function TrailsbuddyName() {
  return (
    <Text>
      <Text style={styles.redText}>t</Text>
      <Text style={styles.whiteText}>rails</Text>
      <Text style={styles.redText}>b</Text>
      <Text style={styles.whiteText}>uddy</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  redText: {
    color: COLOR_RED,
  },
  whiteText: {
    color: COLOR_WHITE,
  },
});

export default TrailsbuddyName;
