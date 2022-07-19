import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {FetchContests} from '../services/Services';
import {INR_SYMBOL} from '../utils/constants';
import {getTimeRemaining} from '../utils/utils';

export interface OngoingContestsData {
  key: string;
  title: string;
  sponsoredBy: string;
  topPrize: string;
  prizeRatio: string;
  entryFee: string;
  timeRemaining: string;
}

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

const getRatio = (numerator: number | undefined, denomonator: number | undefined): string => {
  if (numerator && denomonator && numerator > 0 && denomonator > 0) {
    return `${numerator}:${denomonator}`;
  }

  return '';
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
