// features/loading/loadingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    setLoading: (state, action) => action.payload,
  },
});

export const { setLoading } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;