import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export interface userState {
  loading: boolean;
  error?: string;
  loginState: number;
  intermidiatePhone: string| undefined;
  user_detail?: UserDetails;
}

const initialState: userState = {
  loginState: 0,
  loading: false,
  error: undefined,
  intermidiatePhone: undefined,
  user_detail: undefined
};

const UserSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    userRegLogState: (state, action: PayloadAction<any>) => {
      state.loginState = action.payload.value;
      state.intermidiatePhone = action.payload.phone;
    },
    userDetailUpdate: (state, action: PayloadAction<UserDetails>) => {
      state.user_detail = action.payload;
    },
    errorUpdate: (state, action: PayloadAction<string| undefined>) => {
      state.error = action.payload;
    },
    loadingUpdate: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    userLogout: (state) => {
      state.user_detail = undefined;
    },
  }
});

export const {userRegLogState,userDetailUpdate,loadingUpdate,errorUpdate,userLogout} = UserSlice.actions;
export default UserSlice;


export interface UserDetails {
  id: number
  name: string
  email: string
  phone: string
  profilePic: string
  isActive: boolean
  hasUsedReferralCode: boolean
  referralCode: string
  referredBy: string
}