import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Spinner from 'react-native-spinkit';
import {COLOR_WHITE} from '../../utils/constants';
import {useAppSelector} from '../../redux/useTypedSelectorHook';

const SpinnerView = () => {
  const {loading} = useAppSelector(state => state.user);
  return loading ? (
    <View style={styles.spinnerContainer}>
      <View>
        <Spinner color={COLOR_WHITE} size={120} type="ThreeBounce" isVisible={loading} />
      </View>
      <Text style={[styles.loadingText]}>Loading...</Text>
    </View>
  ) : (
    <></>
  );
};

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

export default SpinnerView;
