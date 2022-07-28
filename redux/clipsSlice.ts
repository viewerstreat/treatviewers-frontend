import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ClipSchema, GetClipResponse} from '../definitions/clip';
import {FetchClips} from '../services/backend';

interface ClipsState {
  values: ClipSchema[];
  loading: boolean;
}

const initialState: ClipsState = {
  values: [],
  loading: false,
};

export const loadClips = createAsyncThunk<GetClipResponse, void>('clips/load', async () => {
  const {data} = await FetchClips();
  return data;
});

const clipsSlice = createSlice({
  name: 'clips',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadClips.pending, state => {
      state.loading = true;
    });
    builder.addCase(loadClips.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.values = state.values.concat(action.payload.data);
      }
    });
    builder.addCase(loadClips.rejected, state => {
      state.loading = false;
    });
  },
});

export default clipsSlice;
