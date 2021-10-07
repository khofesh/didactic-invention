import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetail() {
  let { imdbID } = useParams();

  return (
    <div>
      <p>movie detail</p>
      <p>{imdbID}</p>
    </div>
  );
}
