import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {COLOR_BLACK, COLOR_BROWN, COLOR_GREY, COLOR_WHITE} from '../../utils/constants';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Controller, useForm} from 'react-hook-form';
import {useAppDispatch} from '../../redux/useTypedSelectorHook';
import {loadingUpdate, userDetailUpdate, userRegLogState} from '../../redux/userSlice';
import {signInFb, signInGoogle} from '../../services/socialSignin';
import {GenerateOTP, SocialLogin} from '../../services/backend';
import {saveLoginScheme, showMessage} from '../../services/misc';
import {LOGIN_SCHEME} from '../../definitions/user';
import {updateToken} from '../../redux/tokenSlice';

interface LoginFormProps {}
const LoginForm = ({}: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const {control, handleSubmit} = useForm<any>({mode: 'all'});
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
          if (err && err.response && err.response.status === 404) {
            dispatch(loadingUpdate(false));
            dispatch(userRegLogState({value: 2, phone: data.phone}));
          }
        });
    } else {
      showMessage('Invalid Phone Number');
    }
  };

  const gooleSignIn = async () => {
    try {
      const idToken = await signInGoogle();
      dispatch(loadingUpdate(true));
      const {data} = await SocialLogin({loginScheme: LOGIN_SCHEME.GOOGLE, idToken});
      if (!data.success) {
        showMessage('Unable to login!');
        return;
      }
      saveLoginScheme(LOGIN_SCHEME.GOOGLE);
      dispatch(userDetailUpdate(data.data));
      dispatch(updateToken(data.token));
      dispatch(loadingUpdate(false));
    } catch (error) {
      if (error instanceof Error) {
        showMessage('Unable to login!');
      }
    }
  };

  const fbSignin = async () => {
    try {
      const fbToken = await signInFb();
      dispatch(loadingUpdate(true));
      if (!fbToken) {
        showMessage('Facebook signin failed');
      }
      const {data} = await SocialLogin({loginScheme: LOGIN_SCHEME.FACEBOOK, fbToken});
      saveLoginScheme(LOGIN_SCHEME.FACEBOOK);
      dispatch(userDetailUpdate(data.data));
      dispatch(updateToken(data.token));
      dispatch(loadingUpdate(false));
    } catch (err) {
      if (err instanceof Error) {
        showMessage('Unable to login!');
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
      <View style={styles.wrapper}>
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
  wrapper: {
    marginTop: 30,
    flexDirection: 'row',
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
