import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLOR_GREY, COLOR_WHITE} from '../../utils/constants';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useFocusEffect} from '@react-navigation/native';
import {OTP_TIMER} from '../../utils/config';
import {RootState} from '../../redux/store';
import {useAppDispatch, useAppSelector} from '../../redux/useTypedSelectorHook';
import {GenerateOTP, VerifyOTP} from '../../services/backend';
import {errorUpdate, loadingUpdate, userDetailUpdate, userRegLogState} from '../../redux/userSlice';
import {updateRefreshToken, updateToken} from '../../redux/tokenSlice';
import {saveLoginScheme, saveRefreshToken, showMessage} from '../../services/misc';
import {LOGIN_SCHEME} from '../../definitions/user';

const LoginOTP = () => {
  const dispatch = useAppDispatch();
  const {intermidiatePhone} = useAppSelector((state: RootState) => state.user);
  const [otp, setOtp] = useState<string>();
  const [timer, setTimer] = useState<number>(0);

  useFocusEffect(
    React.useCallback(() => {
      const deductTimer = async () => {
        if (timer <= 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          setTimer(0);
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000));
          setTimer(timer - 1);
        }
      };

      if (timer > 0) {
        deductTimer();
      }
    }, [timer]),
  );

  useFocusEffect(
    React.useCallback(() => {
      setTimer(OTP_TIMER);
    }, []),
  );

  const startTimer = async () => {
    setTimer(10);
  };

  const Resend = () => {
    if (intermidiatePhone) {
      dispatch(loadingUpdate(true));
      GenerateOTP(+intermidiatePhone)
        .then(response => {
          dispatch(loadingUpdate(false));
          if (response) {
            showMessage('OTP sent!!');
          }
        })
        .catch(err => {
          dispatch(loadingUpdate(false));
          dispatch(errorUpdate(err?.response?.data?.message));
        });
    }
  };

  const ChangeNumber = () => {
    dispatch(userRegLogState({value: 0, phone: undefined}));
  };

  const VlidateOTP = () => {
    if (!!otp && otp.length < 6) {
      showMessage('Invalid OTP.');
    } else if (!!otp && !!intermidiatePhone) {
      dispatch(loadingUpdate(true));
      VerifyOTP({
        otp: otp.toString(),
        phone: +intermidiatePhone,
      })
        .then(response => {
          dispatch(loadingUpdate(false));
          if (!!response && !!response.data) {
            dispatch(userDetailUpdate(response.data.data));
            dispatch(updateToken(response.data.token));
            dispatch(updateRefreshToken(response.data.refreshToken));
            dispatch(userRegLogState({value: 0, phone: undefined}));
            saveRefreshToken(response.data.refreshToken);
            saveLoginScheme(LOGIN_SCHEME.OTP_BASED);
          }
        })
        .catch(error => {
          dispatch(errorUpdate(error?.response?.data?.message));
          dispatch(loadingUpdate(false));
        });
    }
  };

  const onResend = () => {
    setTimer(10);
    startTimer();
    Resend();
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.lableTop}>OTP has been send to {intermidiatePhone}</Text>
      </View>
      <OTPInputView
        style={styles.otpInputView}
        pinCount={6}
        onCodeChanged={code => setOtp(code)}
        code={otp}
        selectionColor={COLOR_WHITE}
        autoFocusOnLoad={false}
        keyboardType={'number-pad'}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
      />
      <View style={styles.row}>
        <View style={styles.wrapper}>
          <Text style={styles.lableTop}>Not received OTP yet?</Text>
          <TouchableOpacity style={styles.pl10} onPress={onResend}>
            <Text
              style={[
                styles.lableTop,
                styles.underline,
                {color: timer <= 0 ? COLOR_WHITE : COLOR_GREY},
              ]}>
              Resend
            </Text>
            {timer > 0 && (
              <Text style={[styles.lableTop]}>{timer === 10 ? '00:' + timer : '00:0' + timer}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.row} onPress={() => ChangeNumber()}>
        <Text style={[styles.lableTop, styles.underline]}>Change Number</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => VlidateOTP()}>
        <FeatherIcon name="arrow-right-circle" size={50} color={COLOR_WHITE} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    marginBottom: 80,
  },
  row: {
    flexDirection: 'row',
  },
  pl10: {paddingLeft: 10},
  underline: {
    textDecorationLine: 'underline',
  },
  wrapper: {
    margin: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  underlineStyleBase: {
    width: 40,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: COLOR_WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  otpInputView: {
    height: 100,
    marginLeft: 10,
  },
  underlineStyleHighLighted: {
    borderColor: COLOR_WHITE,
    color: COLOR_WHITE,
  },
  button: {
    marginTop: 20,
  },
  lableTop: {
    color: COLOR_WHITE,
    fontSize: 18,
  },
});

export default LoginOTP;
