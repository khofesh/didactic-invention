import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import isEmpty from "lodash.isempty";

import {
  fetchMovieByIdAsync,
  selectMovieDetailData,
  selectStatus,
} from "../../features/movieDetail/movieDetailSlice";

export default function MovieDetail() {
  const movieDetailData = useSelector(selectMovieDetailData);
  const status = useSelector(selectStatus);
  const { imdbID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieByIdAsync({ id: imdbID }));
  }, [dispatch, imdbID]);

  return (
    <Container style={{ marginTop: 20, marginBottom: 20 }}>
      {isEmpty(movieDetailData) || status === "loading" ? (
        <Row>
          <Col>{status === "loading" ? <p>loading</p> : <p>Empty</p>}</Col>
        </Row>
      ) : (
        <Row>
          <Col xs={12} style={{ marginBottom: "3rem" }}>
            <Link to="/">Go back home</Link>
          </Col>
          <Col xs={12} lg={6} xl={6} xxl={6} style={{ marginBottom: "3rem" }}>
            <Image src={movieDetailData.Poster} rounded />
          </Col>
          <Col
            xs={12}
            lg={6}
            xl={6}
            xxl={6}
            style={{ marginBottom: "3rem", textAlign: "left" }}
          >
            <p>Title: {movieDetailData.Title}</p>
            <p>Year: {movieDetailData.Year}</p>
            <p>Released: {movieDetailData.Released}</p>
            <p>Runtime: {movieDetailData.Runtime}</p>
            <p>Actors: {movieDetailData.Actors}</p>
            <p>IMDB Rating: {movieDetailData.imdbRating}</p>
            <p>IMDB Votes: {movieDetailData.imdbVotes}</p>
          </Col>
        </Row>
      )}
    </Container>
  );
}
