import React, { useEffect, useCallback, useState } from "react";
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
  const [page, pageSet] = useState(1);

  window.onscroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (status !== "loading") {
        await dispatch(fetchMovieAsync({ page: page + 1, title: "batman" }));
        pageSet(page + 1);
      }
    }
  };

  const getMovieData = useCallback(
    () => dispatch(fetchMovieAsync({ page: 1, title: "batman" })),
    [dispatch]
  );

  useEffect(() => {
    getMovieData();
  }, [getMovieData]);

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
          : movieData.map((movie, index) => {
              if (isEmpty(movie.Title)) {
                return null;
              } else {
                return (
                  <div className={styles.movie} key={index}>
                    <p className={styles.movieTitle}>{movie.Title}</p>
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      width="300"
                      height="400"
                    ></img>
                  </div>
                );
              }
            })}
      </div>

      <div>
        <p>status: {status}</p>
      </div>
    </div>
  );
}
