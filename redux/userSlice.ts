import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FaviouriteSchema, UserSchema} from '../definitions/user';

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
    userLogout: state => {
      state.userDetail = undefined;
    },
    FavouritesUpdate: (state, action: PayloadAction<FaviouriteSchema[]>) => {
      state.faviourites = action.payload;
    },
  },
});

export const {
  userRegLogState,
  userDetailUpdate,
  loadingUpdate,
  errorUpdate,
  userLogout,
  FavouritesUpdate,
} = UserSlice.actions;
export default UserSlice;
