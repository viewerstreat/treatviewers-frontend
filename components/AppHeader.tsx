import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {COLOR_BROWN, COLOR_RED, COLOR_WHITE} from '../utils/constants';

function AppHeader() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.txtWrap}>
        <Text style={styles.txt}>
          <Text style={styles.redText}>t</Text>
          <Text style={styles.whiteText}>rails</Text>
          <Text style={styles.redText}>b</Text>
          <Text style={styles.whiteText}>uddy</Text>
        </Text>
        <Image
          resizeMode="contain"
          source={require('../images/trailsbuddy_logo.png')}
          style={styles.logoImg}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 70,
    backgroundColor: COLOR_BROWN,
    justifyContent: 'center',
  },
  txtWrap: {
    width: '90%',
    marginLeft: '10%',
    flexDirection: 'row',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  txt: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  redText: {
    color: COLOR_RED,
  },
  whiteText: {
    color: COLOR_WHITE,
  },
  logoImg: {
    height: 60,
  },
});

export default AppHeader;
