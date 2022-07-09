import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export interface userState {
  loading: boolean;
  error: boolean;
  loginState: number;
  intermidiatePhone: string| undefined;
  user_detail?: UserDetails;
}

const initialState: userState = {
  loginState: 0,
  loading: false,
  error: false,
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
    }
  },
});

export const {userRegLogState} = UserSlice.actions;
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