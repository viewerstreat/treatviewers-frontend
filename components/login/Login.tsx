import {StyleSheet, ImageBackground} from 'react-native';
import React from 'react';
import LoginForm from './LoginForm';
import LoginOTP from './LoginOTP';
import {useFocusEffect} from '@react-navigation/native';
import Registration from './Registration';
import {useAppDispatch, useAppSelector} from '../../redux/useTypedSelectorHook';
import {RootState} from '../../redux/store';
import {userRegLogState} from '../../redux/userSlice';

const Login = () => {
  const dispatch = useAppDispatch();
  const {loginState} = useAppSelector((state: RootState) => state.user);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(userRegLogState(0));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  return (
    <ImageBackground
      style={styles.container}
      imageStyle={styles.imageStyle}
      source={require('../../images/bg.png')}>
      {loginState === 1 ? <LoginOTP /> : loginState === 2 ? <Registration /> : <LoginForm />}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageStyle: {
    opacity: 0.9,
  },
});

export default Login;
