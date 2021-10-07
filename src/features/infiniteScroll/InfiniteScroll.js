import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMovieAsync,
  selectMovieData,
  selectStatus,
} from "./infiniteScrollSlice";
import styles from "./InfiniteScroll.module.css";

export function InfiniteScroll() {
  const movieData = useSelector(selectMovieData);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieAsync());
  }, []);

  return (
    <div>
      <div className={styles.topnav}>
        <input type="text" placeholder="Search Movie.." />
      </div>

      <p>hello from infinite scroll</p>

      <div>
        <p>status: {status}</p>
      </div>
    </div>
  );
}
