import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface TokenState {
  token: string;
  refreshToken: string;
}

const initialState: TokenState = {
  token: '',
  refreshToken: '',
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
});

export const {updateToken, updateRefreshToken} = tokenSlice.actions;
export default tokenSlice;
