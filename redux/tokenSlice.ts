import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RenewTokenPayload, RenewTokenResponse} from '../definitions/user';
import {RenewToken} from '../services/backend';
import {saveRefreshToken} from '../services/misc';
import {AppThunk} from './store';
import {userDetailUpdate} from './userSlice';

export interface TokenState {
  token: string;
  refreshToken: string;
}

const initialState: TokenState = {
  token: '',
  refreshToken: '',
};

type RenewTokenRet = {token: string; refreshToken?: string};
// createAsyncThunk<<RETURN_VALUE_OF_THUNK_ACTION>, <INPUT_PARAMETER_TYPE>>
// 1. call renewToken api to get updated token
// 2. dispatch action to update userDetails
// 3. save refreshToken to async storage
// 4. return token and refreshToken
export const renewTokenAction = createAsyncThunk<RenewTokenRet, RenewTokenPayload>(
  'token/renewToken',
  async (params, thunkApi) => {
    try {
      const {data} = await RenewToken(params);
      if (!data.success) {
        throw new Error('Not able to refresh token');
      }
      thunkApi.dispatch(userDetailUpdate(data.data));
      const {token, refreshToken} = data;
      // if refreshToken is received then save to async storage for future use
      await saveRefreshToken(refreshToken);
      return {token, refreshToken};
    } catch (err) {
      return {token: '', refreshToken: ''};
    }
  },
);

export const updateTokenThunk =
  (param: RenewTokenResponse): AppThunk =>
  async (dispatch, _getState) => {
    dispatch(userDetailUpdate(param.data));
    dispatch(updateToken(param.token));
    if (param.refreshToken) {
      dispatch(updateRefreshToken(param.refreshToken));
      await saveRefreshToken(param.refreshToken);
    }
  };

const tokenSlice = createSlice({
  name: 'tokenSlice',
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    updateRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(renewTokenAction.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken || '';
    });
  },
});

export const {updateToken, updateRefreshToken} = tokenSlice.actions;
export default tokenSlice;
