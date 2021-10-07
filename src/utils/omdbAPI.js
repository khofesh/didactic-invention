import axios from "axios";

export async function fetchMovieData(apiKey, title, page = "1") {
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${apiKey}&r=json&s=${title}&page=${page}`
    );

    console.log("param page:", page);

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchMovieById(apiKey, id) {
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${apiKey}&r=json&i=${id}`
    );

    return response;
  } catch (error) {
    console.log(error);
  }
}
