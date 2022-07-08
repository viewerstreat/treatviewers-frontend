import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export interface userState {
  loading: boolean;
  error: boolean;
  loginState: number;
  intermidiatePhone: string| undefined
}

const initialState: userState = {
  loginState: 0,
  loading: false,
  error: false,
  intermidiatePhone: undefined
};

const UserSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    userRegLogState: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      
      state.loginState = action.payload.value;
      state.intermidiatePhone = action.payload.phone;
    },
  },
});

export const {userRegLogState} = UserSlice.actions;
export default UserSlice;