import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMovieData } from "../../utils";
import isEmpty from "lodash.isempty";

const initialState = {
  movieData: [],
  status: "idle",
  totalResults: "0",
  page: 1,
  title: "",
};

export const fetchMovieAsync = createAsyncThunk(
  "infinite/fetchMovie",
  async ({ title, page }) => {
    const response = await fetchMovieData(
      process.env.REACT_APP_OMDB_KEY,
      title,
      page
    );
    console.log("fetchMovieAsync", response.data);

    return response.data;
  }
);

export const fetchMovieRewriteAsync = createAsyncThunk(
  "infinite/fetchMovieRewrite",
  async ({ title, page }) => {
    const response = await fetchMovieData(
      process.env.REACT_APP_OMDB_KEY,
      title,
      page
    );
    console.log("fetchMovieRewriteAsync", response.data);

    return response.data;
  }
);

export const infiniteSlice = createSlice({
  name: "infiniteScroll",
  initialState,
  reducers: {
    incrementPage: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.page += 1;
    },
    incrementPageByAmount: (state, action) => {
      state.page += action.payload;
    },
    changeTitle: (state, action) => {
      state.title = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const arr = [...state.movieData, ...action.payload.Search];

        state.movieData = isEmpty(state.movieData)
          ? action.payload.Search
          : [...new Map(arr.map((item) => [item["imdbID"], item])).values()];

        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchMovieRewriteAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieRewriteAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.movieData = action.payload.Search;
        state.totalResults = action.payload.totalResults;
      });
  },
});

export const { incrementPage, incrementPageByAmount, changeTitle } =
  infiniteSlice.actions;

export const selectMovieData = (state) => {
  console.log("state", state);
  return state.infiniteScroll.movieData;
};
export const selectStatus = (state) => state.infiniteScroll.status;
export const selectPage = (state) => state.infiniteScroll.page;
export const selectTitle = (state) => state.infiniteScroll.title;

export default infiniteSlice.reducer;
