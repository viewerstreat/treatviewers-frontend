import React, {useState, useEffect, useRef} from 'react';
import {ImageBackground, StyleSheet, Animated, Text, Easing} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SPLASH_TIMEOUT} from '../../utils/config';
import {configureGoogle} from '../../services/socialSignin';
import {RootStackParamList} from '../../App';
import {COLOR_BROWN, COLOR_RED, COLOR_WHITE} from '../../utils/constants';
import {useAppDispatch} from '../../redux/useTypedSelectorHook';
import {loadOngoingCarousel} from '../../redux/ongoingCarouselSlice';
import {loadContests} from '../../redux/ongoingContestsSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

function Splash(props: Props) {
  const dispatch = useAppDispatch();
  const animation = useRef(new Animated.Value(-500)).current;
  const [authLoaded, setAuthLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      configureGoogle();

      setAuthLoaded(true);
    }, SPLASH_TIMEOUT);
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 0,
      easing: Easing.in(Easing.bounce),
      duration: 2000,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(loadContests());
    dispatch(loadOngoingCarousel());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authLoaded) {
      props.navigation.replace('Home');
    }
  }, [authLoaded, props.navigation]);

  return (
    <ImageBackground
      source={require('../../images/bg.png')}
      resizeMode="cover"
      style={styles.container}>
      <Animated.View style={[styles.wrapper, {transform: [{translateY: animation}]}]}>
        <Text style={styles.txt}>
          <Text style={styles.redText}>t</Text>
          <Text style={styles.whiteText}>rails</Text>
          <Text style={styles.redText}>b</Text>
          <Text style={styles.whiteText}>uddy</Text>
        </Text>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  wrapper: {
    paddingBottom: 50,
  },
  txt: {
    fontSize: 48,
    fontWeight: 'bold',
    backgroundColor: COLOR_BROWN,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  redText: {
    color: COLOR_RED,
  },
  whiteText: {
    color: COLOR_WHITE,
  },
});

export default Splash;
