import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovieAsync, selectMovieData } from "./infiniteScrollSlice";

export function InfiniteScroll() {
  const movieData = useSelector(selectMovieData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieAsync());
  }, []);

  return (
    <div>
      <p>hello from infinite scroll</p>
    </div>
  );
}
