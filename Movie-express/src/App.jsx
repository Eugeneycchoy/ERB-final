import { useEffect, useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";

// import components
import Navbar from "../src/components/Navbar/Navbar.jsx";
import SingleMovie from "../src/components/SingleMovie/SingleMovie.jsx";
import MovieCarousel from "../src/components/MovieCarousel/MovieCarousel.jsx";

function App() {
  const apiKey = "7e2c4aa4c12d6fa20f4fe120dba56b78";
  const moviesUrl = "https://api.themoviedb.org/3/movie/550?api_key=" + apiKey;

  /* -------------------------------------------------------------------------- */
  /*                           Popular Movies & Series                          */
  /* -------------------------------------------------------------------------- */
  const popularUrl =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  const popularOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer 7e2c4aa4c12d6fa20f4fe120dba56b78",
    },
  };

  async function getMovieData(url, options) {
    const response = await fetch(url, options);
    const responseJSON = await response.json();
    return responseJSON;
  }

  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getMovieData(popularUrl, popularOptions);
      setPopularMovies(data.results);
    }
    fetchData();
  }, []);

  console.log(popularMovies);
  return (
    <>
      <Navbar />
      <main>
        <MovieCarousel movies={popularMovies} tag="🔥 Now Trending" />
      </main>
    </>
  );
}

export default App;
