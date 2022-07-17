import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import ongoingCarouselSlice from './ongoingCarouselSlice';
import ongoingContestsSlice from './ongoingContestsSlice';
export const store = configureStore({
  reducer: {
    ongoingContests: ongoingContestsSlice.reducer,
    ongoingCarousel: ongoingCarouselSlice.reducer,
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
