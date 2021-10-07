import axios from "axios";

export async function fetchMovieData(apiKey, title = "batman", page = "1") {
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${apiKey}&r=json&s=${title}&page=${page}`
    );

    return response;
  } catch (error) {
    console.log(error);
  }
}
