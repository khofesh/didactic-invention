import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import isEmpty from "lodash.isempty";

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
  }, [dispatch]);

  useEffect(() => {
    console.log("fuck", movieData);
  }, [movieData]);

  return (
    <div>
      <div className={styles.topnav}>
        <input type="text" placeholder="Search Movie.." />
      </div>

      <div className={styles.root}>
        {isEmpty(movieData)
          ? null
          : movieData.map((movie, index) => (
              <div className={styles.movie} key={index}>
                <p className={styles.movieTitle}>{movie.Title}</p>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  width="300"
                  height="400"
                ></img>
              </div>
            ))}
      </div>

      <div>
        <p>status: {status}</p>
      </div>
    </div>
  );
}
