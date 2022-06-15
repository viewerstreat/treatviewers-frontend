import {createSlice} from '@reduxjs/toolkit';

export interface OngoingContestsData {
  key: number;
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

const ongoingContestsSlice = createSlice({
  name: 'ongoingContests',
  initialState,
  reducers: {
    loadMockData: state => {
      const mockData = require('../mockData.json');
      state.values = mockData;
    },
  },
});

export const {loadMockData} = ongoingContestsSlice.actions;
export default ongoingContestsSlice;
