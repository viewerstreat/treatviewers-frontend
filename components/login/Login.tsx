import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/useTypedSelectorHook';
import {userRegLogState} from '../../redux/userSlice';
import LoginForm from './LoginForm';
import LoginOTP from './LoginOTP';
import Registration from './Registration';

const Login = () => {
  const dispatch = useAppDispatch();
  const {loginState} = useAppSelector(state => state.user);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(userRegLogState(0));
    }, [dispatch]),
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
