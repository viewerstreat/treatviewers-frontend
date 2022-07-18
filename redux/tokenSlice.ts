import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export interface userState {
  token?: string;
}

const initialState: userState = {
 token: undefined
};

const tokenSlice = createSlice({
    name: 'tokenSlice',
    initialState,
    reducers: {
      updateToken: (state, action: PayloadAction<string>) => {
        state.token = action.payload;
      }
    },
  });
  
  export const {updateToken} = tokenSlice.actions;
  export default tokenSlice;