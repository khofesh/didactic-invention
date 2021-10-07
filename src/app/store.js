import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import infiniteScrollReducer from "../features/infiniteScroll/infiniteScrollSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    infiniteScroll: infiniteScrollReducer,
  },
});
