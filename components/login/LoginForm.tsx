/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';
import React, {useEffect} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {COLOR_BLACK, COLOR_BROWN, COLOR_GREY, COLOR_WHITE} from '../../utils/constants';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Controller, useForm} from 'react-hook-form';
import {GenerateOTP} from '../../services/Services';
import {useAppDispatch} from '../../redux/useTypedSelectorHook';
import {loadingUpdate, userRegLogState} from '../../redux/userSlice';

import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  Profile,
  AccessToken,
  // GraphRequest,
  // GraphRequestManager,
} from 'react-native-fbsdk-next';
import {GOOGLE_WEB_CLIENT_ID} from '../../utils/config';

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

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email', 'profile', 'openid'],
      webClientId: GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('SIGN_IN_CANCELLED');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('IN_PROGRESS');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        // some other error happened
        console.log('OTHERS', error.toString());
      }
    }
  };

  const _fbSignin = async () => {
    const result = await LoginManager.logInWithPermissions(['public_profile']);
    if (result.isCancelled) {
      console.log('login cancelled');
      return;
    }
    const currentProfile = await Profile.getCurrentProfile();
    console.log(currentProfile);
    const token = await AccessToken.getCurrentAccessToken();
    console.log(token);

    // let req = new GraphRequest(
    //   '/me',
    //   {
    //     httpMethod: 'GET',
    //     version: 'v2.5',
    //     parameters: {
    //       fields: {
    //         string: 'email,name,picture',
    //       },
    //     },
    //   },
    //   (err, res) => {
    //     console.log(err, res);
    //   },
    // );

    // new GraphRequestManager().addRequest(req).start();
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
        <TouchableOpacity style={styles.socialButton} onPress={_fbSignin}>
          <FeatherIcon name="facebook" size={30} color={COLOR_WHITE} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={_signIn}>
          <AntIcon name="google" size={30} color={COLOR_WHITE} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;
interface LoginFormProps {}
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
