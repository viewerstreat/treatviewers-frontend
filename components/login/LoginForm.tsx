/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {COLOR_BLACK, COLOR_BROWN, COLOR_GREY, COLOR_WHITE} from '../../utils/constants';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Controller, useForm} from 'react-hook-form';
import {useAppDispatch} from '../../redux/useTypedSelectorHook';
import {loadingUpdate, userRegLogState} from '../../redux/userSlice';
import {signInFb, signInGoogle} from '../../services/socialSignin';
import {GenerateOTP} from '../../services/Services';
import {showMessage} from '../../services/misc';

interface LoginFormProps {}
const LoginForm = ({}: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const {control, handleSubmit} = useForm<any>({
    mode: 'all',
  });
  const onSubmit = (data: any) => {
    if (!!data.phone && data.phone.length === 10) {
      dispatch(loadingUpdate(true));
      GenerateOTP(+data.phone)
        .then(() => {
          dispatch(loadingUpdate(false));
          dispatch(userRegLogState({value: 1, phone: data.phone}));
        })
        .catch(err => {
          console.log(err);

          if (!!err && !!err.response && err.response.status === 404) {
            dispatch(loadingUpdate(false));
            dispatch(userRegLogState({value: 2, phone: data.phone}));
          }
        });
    } else {
      ToastAndroid.show('Invalid Phone Number', 3000);
    }
  };

  const gooleSignIn = async () => {
    try {
      const idToken = await signInGoogle();
      console.log('idToken = ', idToken);
    } catch (error) {
      if (error instanceof Error) {
        showMessage(error.message);
      }
    }
  };

  const fbSignin = async () => {
    try {
      const token = await signInFb();
      console.log('token = ', token);
      if (!token) {
        showMessage('Facebook signin failed');
      }
    } catch (err) {
      if (err instanceof Error) {
        showMessage(err.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <Controller
          name="phone"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              selectionColor={COLOR_BLACK}
              textAlign={'center'}
              style={[styles.textInput]}
              maxLength={10}
              keyboardType={'number-pad'}
              placeholder={'Phone Number'}
            />
          )}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <FeatherIcon name="arrow-right-circle" size={50} color={COLOR_WHITE} />
      </TouchableOpacity>
      <View style={{marginTop: 30, flexDirection: 'row'}}>
        <TouchableOpacity style={styles.socialButton} onPress={fbSignin}>
          <FeatherIcon name="facebook" size={30} color={COLOR_WHITE} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={gooleSignIn}>
          <AntIcon name="google" size={30} color={COLOR_WHITE} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 80,
  },
  textInputContainer: {
    height: 45,
    backgroundColor: COLOR_WHITE,
    width: '70%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLOR_GREY,
  },
  textInput: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    color: COLOR_BROWN,
  },
  button: {
    marginTop: 20,
  },
  socialButton: {
    borderWidth: 4,
    borderColor: COLOR_WHITE,
    padding: 2,
    borderRadius: 5,
    margin: 15,
  },
});

export default LoginForm;
