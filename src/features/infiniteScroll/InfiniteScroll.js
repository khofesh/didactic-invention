import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import isEmpty from "lodash.isempty";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

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
  const [showModal, showModalSet] = useState(false);
  const [selected, selectedSet] = useState({});

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

  const movieClicked = (data) => {
    selectedSet(data);
    console.log(data);
    showModalSet(true);
  };

  const handleClose = () => {
    showModalSet(false);
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
                <Card
                  style={{ width: "16rem", margin: "0.3rem" }}
                  key={index}
                  onClick={() => movieClicked(movie)}
                >
                  <Card.Img
                    variant="top"
                    src={movie.Poster}
                    alt={movie.Title}
                    width="300"
                    height="400"
                  />
                  <Card.Body>
                    <Card.Text>{movie.Title}</Card.Text>
                  </Card.Body>
                </Card>
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

      {/* <!-- The Modal --> */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selected ? selected.Title : "Movie Title"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={6} md={4}>
              <Image src={selected.Poster} fluid width="100" height="200" />
            </Col>
            <Col xs={6} md={4}>
              <p>Year: {selected ? selected.Year : "Movie Year"}</p>
              <p>ID: {selected ? selected.imdbID : "IMDB ID"}</p>
              <Link to={`/movie-detail/${selected.imdbID}`}>Movie Detail</Link>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}
