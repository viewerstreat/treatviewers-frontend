import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {GOOGLE_WEB_CLIENT_ID} from '../utils/config';

export const configureGoogle = () => {
  GoogleSignin.configure({
    scopes: ['email', 'profile', 'openid'],
    webClientId: GOOGLE_WEB_CLIENT_ID,
    offlineAccess: true,
  });
};

export const signInGoogle = async (silent?: boolean): Promise<string> => {
  try {
    const result = await GoogleSignin.hasPlayServices();
    if (!result) {
      throw new Error('PLAY_SERVICES_NOT_AVAILABLE');
    }
    let token = null;
    if (silent) {
      const {idToken} = await GoogleSignin.signInSilently();
      token = idToken;
    } else {
      const {idToken} = await GoogleSignin.signIn();
      token = idToken;
    }
    if (!token) {
      throw new Error('ID_TOKEN_NOT_RECEIVED');
    }
    return token;
  } catch (err: any) {
    if (err.code === statusCodes.SIGN_IN_CANCELLED) {
      throw new Error('SIGN_IN_CANCELLED');
    } else if (err.code === statusCodes.IN_PROGRESS) {
      throw new Error('SIGN_IN_PROGESS');
    } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new Error('PLAY_SERVICES_NOT_AVAILABLE');
    } else {
      throw err;
    }
  }
};

export const signInFb = async (): Promise<string> => {
  const result = await LoginManager.logInWithPermissions(['public_profile']);
  if (result.isCancelled) {
    throw new Error('login cancelled');
  }
  return getFbToken();
};

export const getFbToken = async (): Promise<string> => {
  try {
    const token = await AccessToken.getCurrentAccessToken();
    return token?.accessToken || '';
  } catch (err) {
    return '';
  }
};
