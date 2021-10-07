import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import {
  fetchMovieByIdAsync,
  selectMovieDetailData,
  selectStatus,
} from "../../features/movieDetail/movieDetailSlice";

export default function MovieDetail() {
  const movieDetailData = useSelector(selectMovieDetailData);
  const { imdbID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieByIdAsync({ id: imdbID }));
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <p>movie detail</p>
        </Col>
        <Col>
          <p>{imdbID}</p>
        </Col>
      </Row>
    </Container>
  );
}
