import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import ongoingContestsSlice from './ongoingContestsSlice';
import tokenSlice from './tokenSlice';
import UserSlice from './userSlice';
export const store = configureStore({
  reducer: {
    ongoingContests: ongoingContestsSlice.reducer,
    userState: UserSlice.reducer,
    tokenSlice: tokenSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
