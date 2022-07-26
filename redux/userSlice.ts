import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FaviouriteSchema, UserSchema} from '../definitions/user';
import {cleanUpStorage} from '../services/misc';
import {updateRefreshToken, updateToken} from './tokenSlice';

export interface userState {
  loading: boolean;
  error?: string;
  loginState: number;
  intermidiatePhone: string | undefined;
  userDetail?: UserSchema;
  faviourites: FaviouriteSchema[];
}

const initialState: userState = {
  loginState: 0,
  loading: false,
  error: undefined,
  intermidiatePhone: undefined,
  userDetail: undefined,
  faviourites: [],
};

// logout action thunk reducer
// clean up async storage
// clean up token store
// clean up user store
export const logoutUser = createAsyncThunk<void, void>('user/logout', async (_: void, thunkApi) => {
  await cleanUpStorage();
  thunkApi.dispatch(updateToken(''));
  thunkApi.dispatch(updateRefreshToken(''));
  return;
});

const UserSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    userRegLogState: (state, action: PayloadAction<any>) => {
      state.loginState = action.payload.value;
      state.intermidiatePhone = action.payload.phone;
    },
    userDetailUpdate: (state, action: PayloadAction<UserSchema>) => {
      state.userDetail = action.payload;
    },
    errorUpdate: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    },
    loadingUpdate: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    FavouritesUpdate: (state, action: PayloadAction<FaviouriteSchema[]>) => {
      state.faviourites = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(logoutUser.fulfilled, state => {
      state.userDetail = undefined;
    });
  },
});

export const {userRegLogState, userDetailUpdate, loadingUpdate, errorUpdate, FavouritesUpdate} =
  UserSlice.actions;
export default UserSlice;
