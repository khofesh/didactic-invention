import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import isEmpty from "lodash.isempty";

import {
  fetchMovieAsync,
  selectMovieData,
  selectStatus,
  fetchMovieRewriteAsync,
} from "./infiniteScrollSlice";
import styles from "./InfiniteScroll.module.css";

export function InfiniteScroll() {
  const movieData = useSelector(selectMovieData);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();
  const [page, pageSet] = useState(1);
  const [title, titleSet] = useState("batman");

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (status !== "loading") {
        dispatch(fetchMovieAsync({ page: page + 1, title: title }));
        pageSet(page + 1);
      }
    }
  };

  const actionTextChange = (e) => {
    dispatch(fetchMovieRewriteAsync({ page: 1, title: e.target.value }));
    titleSet(e.target.value);
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
        <input
          type="text"
          placeholder="Search Movie.."
          value={title}
          onChange={actionTextChange}
        />
      </div>

      <div className={styles.root}>
        {isEmpty(movieData) ? (
          <div>
            <p>Empty</p>
          </div>
        ) : (
          movieData.map((movie, index) => {
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
          })
        )}
      </div>

      {status === "loading" ? (
        <div>
          <p>{status}</p>
        </div>
      ) : null}
    </div>
  );
}
