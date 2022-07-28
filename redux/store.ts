import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import clipsSlice from './clipsSlice';
import ongoingCarouselSlice from './ongoingCarouselSlice';
import ongoingContestsSlice from './ongoingContestsSlice';
import tokenSlice from './tokenSlice';
import UserSlice from './userSlice';
export const store = configureStore({
  reducer: {
    ongoingContests: ongoingContestsSlice.reducer,
    ongoingCarousel: ongoingCarouselSlice.reducer,
    user: UserSlice.reducer,
    token: tokenSlice.reducer,
    clips: clipsSlice.reducer,
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
