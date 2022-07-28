import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {OngoingContestsData} from '../definitions/contest';
import {FetchContests} from '../services/backend';
import {INR_SYMBOL} from '../utils/constants';
import {getRatio, getTimeRemaining} from '../utils/utils';

export interface OngoingContestsState {
  values: OngoingContestsData[];
  loading: boolean;
  error: boolean;
}

const initialState: OngoingContestsState = {
  values: [],
  loading: false,
  error: false,
};

export const loadContests = createAsyncThunk('ongoingContests/load', async () => {
  const {data} = await FetchContests();
  if (!data.success) {
    throw new Error(data.message);
  }
  const result: OngoingContestsData[] = data.data.map(e => ({
    key: e._id,
    title: e.title,
    sponsoredBy: e.sponsoredBy,
    topPrize: e.prizeValue ? `${INR_SYMBOL}${e.prizeValue}` : '',
    prizeRatio: getRatio(e.prizeRatioNumerator, e.prizeRatioDenominator),
    entryFee: `${INR_SYMBOL}${e.entryFee}`,
    timeRemaining: getTimeRemaining(e.endTime),
  }));
  return result;
});

const ongoingContestsSlice = createSlice({
  name: 'ongoingContests',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadContests.pending, state => {
      state.loading = true;
      state.error = false;
      state.values = [];
    });
    builder.addCase(loadContests.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.values = action.payload;
    });
    builder.addCase(loadContests.rejected, state => {
      state.loading = false;
      state.error = false;
    });
  },
});

export default ongoingContestsSlice;
