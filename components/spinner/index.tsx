import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';
import { COLOR_WHITE } from '../../utils/constants';
import { useAppSelector } from '../../redux/useTypedSelectorHook';
import { RootState } from '../../redux/store';

const SpinnerView = () => {
  const {loading} = useAppSelector((state: RootState) => state.userState);
  const styles = StyleSheet.create({
    spinnerContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: 999,
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.7)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingText: {
      fontSize: 18,
      color: COLOR_WHITE,
    },
  });

  return !!loading ? (
    <View style={styles.spinnerContainer}>
      <View>
        <Spinner
          color={COLOR_WHITE}
          size={120}
          type="9CubeGrid"
          isVisible={loading}
        />
      </View>
      <Text style={[styles.loadingText]}>
        Loading...
      </Text>
    </View>
  ) : (
    <></>
  );
};


export default SpinnerView;
