import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import isEmpty from "lodash.isempty";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import {
  fetchMovieAsync,
  selectMovieData,
  selectStatus,
  fetchMovieRewriteAsync,
  changeTitle,
  selectTitle,
  selectPage,
  incrementPage,
} from "./infiniteScrollSlice";
import styles from "./InfiniteScroll.module.css";

export function InfiniteScroll() {
  const movieData = useSelector(selectMovieData);
  const status = useSelector(selectStatus);
  const title = useSelector(selectTitle);
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  const [showModal, showModalSet] = useState(false);
  const [selected, selectedSet] = useState({});

  const actionTextChange = (e) => {
    console.log(e.target.value);
    dispatch(fetchMovieRewriteAsync({ page: 1, title: e.target.value }));
    dispatch(changeTitle(e.target.value));
  };

  const movieClicked = (data) => {
    selectedSet(data);
    console.log(data);
    showModalSet(true);
  };

  const handleClose = () => {
    showModalSet(false);
  };

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (status !== "loading") {
        dispatch(fetchMovieAsync({ page: page + 1, title: title }));
        dispatch(incrementPage());
        console.log("executed");
      }
    }
  }, [dispatch, page, status, title]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);

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
          <Container>
            <Row className="justify-content-md-center">
              <Col xs={12}>
                <Image
                  src={selected.Poster}
                  className="rounded mx-auto d-block"
                />
              </Col>
              <Col xs={6} md={4}>
                <Link to={`/movie-detail/${selected.imdbID}`}>
                  Movie Detail
                </Link>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}
