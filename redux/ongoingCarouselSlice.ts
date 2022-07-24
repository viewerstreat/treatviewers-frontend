import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {FetchMovies} from '../services/Services';
import {getTimeRemaining} from '../utils/utils';

export interface OngoingCarouselData {
  _id: string;
  title: string;
  timeRemaining: string;
  imageUrl: string;
}

export interface OngoingCarouselState {
  values: OngoingCarouselData[];
  loading: boolean;
  error: boolean;
}

const initialState: OngoingCarouselState = {
  values: [],
  loading: false,
  error: false,
};

export const loadOngoingCarousel = createAsyncThunk('ongoingCarousel/load', async () => {
  const {data} = await FetchMovies();
  if (!data.success) {
    throw new Error(data.message);
  }
  const result: OngoingCarouselData[] = data.data.map(e => ({
    _id: e._id,
    title: e.name,
    imageUrl: e.bannerImageUrl,
    timeRemaining: getTimeRemaining(e.moviePromotionExpiry),
  }));
  return result;
});

const ongoingCarouselSlice = createSlice({
  name: 'ongoingCarousel',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadOngoingCarousel.pending, state => {
      state.loading = true;
      state.values = [];
    });
    builder.addCase(loadOngoingCarousel.fulfilled, (state, action) => {
      state.values = action.payload;
    });
    builder.addCase(loadOngoingCarousel.rejected, state => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default ongoingCarouselSlice;
