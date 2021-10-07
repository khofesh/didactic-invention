import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMovieData } from "./omdbAPI";
import isEmpty from "lodash.isempty";

const initialState = {
  movieData: [],
  status: "idle",
  totalResults: "0",
};

export const fetchMovieAsync = createAsyncThunk(
  "infinite/fetchMovie",
  async () => {
    const response = await fetchMovieData(process.env.REACT_APP_OMDB_KEY);
    console.log("fetchMovieAsync", response.data);

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
        state.movieData = isEmpty(state.movieData)
          ? action.payload.Search
          : [state.movieData, ...action.payload.Search];
        state.totalResults = action.payload.totalResults;
      });
  },
});

export const selectMovieData = (state) => {
  console.log("state", state);
  return state.infiniteScroll.movieData;
};
export const selectStatus = (state) => state.infiniteScroll.status;

export default infiniteSlice.reducer;
