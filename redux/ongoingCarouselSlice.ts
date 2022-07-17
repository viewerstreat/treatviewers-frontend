import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export interface OngoingCarouselData {
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

type ResponseSchema = {
  success: boolean;
  data: {
    name: string;
    bannerImageUrl: string;
    moviePromotionExpiry: number;
  }[];
  message: string;
};

const getTimeRemaining = (time: number): string => {
  const currTime = new Date().getTime();
  const duration = time - currTime;
  const secs = Math.floor(duration / 1000);
  const hours = Math.floor(secs / 3600);
  const days = Math.floor(hours / 24);
  return `${days}d ${hours % 24}hrs`;
};

export const loadOngoingCarousel = createAsyncThunk('ongoingCarousel/load', async () => {
  const url = 'https://trailsbuddy-api.herokuapp.com/api/v1/movie';
  const res = await fetch(url);
  const response: ResponseSchema = await res.json();
  if (!response.success) {
    throw new Error(response.message);
  }
  const data: OngoingCarouselData[] = response.data.map(e => ({
    title: e.name,
    imageUrl: e.bannerImageUrl,
    timeRemaining: getTimeRemaining(e.moviePromotionExpiry),
  }));
  return data;
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
