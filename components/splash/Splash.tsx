import React, {useState, useEffect, useRef} from 'react';
import {ImageBackground, StyleSheet, Animated, Text, Easing} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppDispatch} from '../../redux/useTypedSelectorHook';
import {configureGoogle, getFbToken, signInGoogle} from '../../services/socialSignin';
import {RootStackParamList} from '../../App';
import {SPLASH_TIMEOUT} from '../../utils/config';
import {AppDispatch} from '../../redux/store';
import {RenewToken} from '../../services/backend';
import {updateRefreshToken, updateToken} from '../../redux/tokenSlice';
import {userDetailUpdate} from '../../redux/userSlice';
import {loadOngoingCarousel} from '../../redux/ongoingCarouselSlice';
import {loadContests} from '../../redux/ongoingContestsSlice';
import {getLoginScheme, getRefreshToken} from '../../services/misc';
import {COLOR_BROWN, COLOR_RED, COLOR_WHITE, PATH_HOME} from '../../utils/constants';
import {LOGIN_SCHEME} from '../../definitions/user';
import {sleep} from '../../utils/utils';

// invoke silent login for google
// get user details and token using the idToken
// if fails then assume user hasn't logged into the app yet
const renewGoogleSignin = async (dispatch: AppDispatch) => {
  try {
    const idToken = await signInGoogle(true);
    if (!idToken) {
      return;
    }
    const {data} = await RenewToken({loginScheme: LOGIN_SCHEME.GOOGLE, idToken});
    if (data.success) {
      dispatch(updateToken(data.token));
      dispatch(updateRefreshToken(data.refreshToken));
      dispatch(userDetailUpdate(data.data));
    }
  } catch (err) {}
};

// accquire fb access token
// get user details and api token using the fbToken
// if fails then assume user hasn't logged into the app yet
const renewFbSignin = async (dispatch: AppDispatch) => {
  try {
    const fbToken = await getFbToken();
    console.log('fbToken is', fbToken);
    if (!fbToken) {
      return;
    }
    const {data} = await RenewToken({loginScheme: LOGIN_SCHEME.FACEBOOK, fbToken});
    console.log('data is', data);
    if (data.success) {
      dispatch(updateToken(data.token));
      dispatch(updateRefreshToken(data.refreshToken));
      dispatch(userDetailUpdate(data.data));
    }
  } catch (err) {
    console.log('fbToken refresh error', err);
  }
};

// get refreshToken from async storage
// get user details and api token using the refreshToken
// if refreshToken not found or api call fails
// then user hasn't logged into the app yet
const renewLogin = async (dispatch: AppDispatch) => {
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      return;
    }
    const {data} = await RenewToken({loginScheme: LOGIN_SCHEME.OTP_BASED, refreshToken});
    if (data.success) {
      dispatch(updateToken(data.token));
      dispatch(updateRefreshToken(data.refreshToken));
      dispatch(userDetailUpdate(data.data));
    }
  } catch (err) {}
};

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;
function Splash(props: Props) {
  const dispatch = useAppDispatch();
  const animation = useRef(new Animated.Value(-500)).current;
  const [authLoaded, setAuthLoaded] = useState(false);

  // load user details and token based on loginScheme
  const loadAuth = async () => {
    try {
      const loginScheme = await getLoginScheme();
      console.log('loginScheme is', loginScheme);
      if (!loginScheme) {
        return;
      }
      if (loginScheme === LOGIN_SCHEME.OTP_BASED) {
        await renewLogin(dispatch);
      }
      if (loginScheme === LOGIN_SCHEME.GOOGLE) {
        await renewGoogleSignin(dispatch);
      }
      if (loginScheme === LOGIN_SCHEME.FACEBOOK) {
        await renewFbSignin(dispatch);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // initialize the animation
  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 0,
      easing: Easing.in(Easing.bounce),
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  // load data for the first page
  // for movie carousel and ongoing contests listview
  const loadData = () => {
    dispatch(loadContests());
    dispatch(loadOngoingCarousel());
  };

  // initialize the app
  // and when ready set authLoaded = true
  // so that it navigate to Home page
  const initializeAndNavigate = async () => {
    configureGoogle();
    startAnimation();
    loadData();
    await Promise.all([sleep(SPLASH_TIMEOUT), loadAuth()]);
    setAuthLoaded(true);
  };

  useEffect(() => {
    initializeAndNavigate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // navigate to Home when authLoaded changes
  useEffect(() => {
    if (authLoaded) {
      props.navigation.replace(PATH_HOME);
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
