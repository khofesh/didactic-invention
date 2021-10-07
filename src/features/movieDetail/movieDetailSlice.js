import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMovieById } from "../../utils";

const initialState = {
  movieDetailData: [],
  status: "idle",
  totalResults: "0",
};

export const fetchMovieByIdAsync = createAsyncThunk(
  "movieDetail/fetchMovie",
  async ({ id }) => {
    const response = await fetchMovieById(process.env.REACT_APP_OMDB_KEY, id);
    console.log("fetchMovieByIdAsync", response.data);

    return response.data;
  }
);

export const movieDetailSlice = createSlice({
  name: "movieDetailScroll",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.movieDetailData = action.payload;
      });
  },
});

export const selectMovieDetailData = (state) => {
  console.log("state", state);
  return state.movieDetail.movieDetailData;
};
export const selectStatus = (state) => state.movieDetail.status;

export default movieDetailSlice.reducer;
