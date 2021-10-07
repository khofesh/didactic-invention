import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMovieData } from "./omdbAPI";

const initialState = {
  movieData: {},
  status: "idle",
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
        state.movieData = action.payload;
      });
  },
});

export const selectMovieData = (state) => {
  console.log("state", state);
  return state.infiniteScroll.movieData;
};
export const selectStatus = (state) => state.infiniteScroll.status;

export default infiniteSlice.reducer;
