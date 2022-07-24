import {ToastAndroid} from 'react-native';
import {TOAST_MESSAGE_DURATION} from '../utils/config';

export const showMessage = (msg: string) => {
  ToastAndroid.show(msg, TOAST_MESSAGE_DURATION);
};
