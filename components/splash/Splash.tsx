import React, {useState, useEffect, useRef} from 'react';
import {ImageBackground, StyleSheet, Animated, Text, Easing} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SPLASH_TIMEOUT} from '../../utils/config';
import {configureGoogle, getFbToken, signInGoogle} from '../../services/socialSignin';
import {RootStackParamList} from '../../App';
import {COLOR_BROWN, COLOR_RED, COLOR_WHITE} from '../../utils/constants';
import {useAppDispatch} from '../../redux/useTypedSelectorHook';
import {loadOngoingCarousel} from '../../redux/ongoingCarouselSlice';
import {loadContests} from '../../redux/ongoingContestsSlice';
import {getLoginScheme, getRefreshToken} from '../../services/misc';
import {LOGIN_SCHEME} from '../../definitions/user';
import {RenewToken} from '../../services/Services';
import {updateRefreshToken, updateToken} from '../../redux/tokenSlice';
import {userDetailUpdate} from '../../redux/userSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;
function Splash(props: Props) {
  const dispatch = useAppDispatch();
  const animation = useRef(new Animated.Value(-500)).current;
  const [authLoaded, setAuthLoaded] = useState(false);

  const loadAuth = async () => {
    try {
      configureGoogle();
      const loginScheme = await getLoginScheme();
      if (!loginScheme) {
        throw new Error('loginScheme not found');
      }
      if (loginScheme === LOGIN_SCHEME.OTP_BASED) {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
          throw new Error('refreshToken not found');
        }
        const {data} = await RenewToken({loginScheme, refreshToken});
        if (data.success) {
          dispatch(updateToken(data.token));
          dispatch(updateRefreshToken(data.refreshToken));
          dispatch(userDetailUpdate(data.data));
        }
      }
      if (loginScheme === LOGIN_SCHEME.GOOGLE) {
        const idToken = await signInGoogle(true);
        if (!idToken) {
          throw new Error('idToken not found');
        }
        const {data} = await RenewToken({loginScheme, idToken});
        if (data.success) {
          dispatch(updateToken(data.token));
          dispatch(updateRefreshToken(data.refreshToken));
          dispatch(userDetailUpdate(data.data));
        }
      }
      if (loginScheme === LOGIN_SCHEME.FACEBOOK) {
        const fbToken = await getFbToken();
        if (!fbToken) {
          throw new Error('fbToken not found');
        }
        const {data} = await RenewToken({loginScheme, fbToken});
        if (data.success) {
          dispatch(updateToken(data.token));
          dispatch(updateRefreshToken(data.refreshToken));
          dispatch(userDetailUpdate(data.data));
        }
      }
    } catch (err) {
      console.log(err);
    }
    setAuthLoaded(true);
  };

  useEffect(() => {
    setTimeout(() => {
      loadAuth();
    }, SPLASH_TIMEOUT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
