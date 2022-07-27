import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOAST_MESSAGE_DURATION} from '../utils/config';
import {KEY_LOGIN_SCHEME, KEY_REFRESH_TOKEN} from '../utils/constants';
import {LOGIN_SCHEME} from '../definitions/user';

export const showMessage = (msg: string, duration?: number) => {
  ToastAndroid.show(msg, duration || TOAST_MESSAGE_DURATION);
};

export const saveToAsyncStorage = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getFromAsyncStorage = async (key: string): Promise<any | null> => {
  const val = await AsyncStorage.getItem(key);
  if (val) {
    return JSON.parse(val);
  }
  return val;
};

export const saveRefreshToken = async (token: string) => {
  await AsyncStorage.setItem(KEY_REFRESH_TOKEN, token);
};

export const getRefreshToken = async (): Promise<string | null> => {
  const val = await AsyncStorage.getItem(KEY_REFRESH_TOKEN);
  return val;
};

export const getLoginScheme = async (): Promise<string | null> => {
  const val = await AsyncStorage.getItem(KEY_LOGIN_SCHEME);
  return val;
};

export const saveLoginScheme = async (loginScheme: LOGIN_SCHEME) => {
  await AsyncStorage.setItem(KEY_LOGIN_SCHEME, loginScheme);
};

export const cleanUpStorage = async () => {
  await AsyncStorage.multiRemove([KEY_LOGIN_SCHEME, KEY_REFRESH_TOKEN]);
};
