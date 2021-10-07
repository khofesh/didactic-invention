import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import infiniteScrollReducer from "../features/infiniteScroll/infiniteScrollSlice";
import movieDetailReducer from "../features/movieDetail/movieDetailSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    infiniteScroll: infiniteScrollReducer,
    movieDetail: movieDetailReducer,
  },
});
