import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMovieData } from "./omdbAPI";

const initialState = {
  movieData: [],
  status: "idle",
};

export const fetchMovieAsync = createAsyncThunk(
  "infinite/fetchMovie",
  async () => {
    const response = await fetchMovieData(process.env.REACT_APP_OMDB_KEY);
    return response.data;
  }
);

export const infiniteSlice = createSlice({
  name: "infiniteScroll",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      });
  },
});

export const selectMovieData = (state) => state.counter.movieData;
export const selectStatus = (state) => state.counter.status;

export default infiniteSlice.reducer;
