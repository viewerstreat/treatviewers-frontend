import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import ongoingContestsSlice from './ongoingContestsSlice';
export const store = configureStore({
  reducer: {
    ongoingContests: ongoingContestsSlice.reducer,
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
