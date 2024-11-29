import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "../src/components/Navbar/Navbar.jsx";
import MovieCarousel from "../src/components/MovieCarousel/MovieCarousel.jsx";
import MovieList from "../src/components/MovieList/MovieList.jsx";
import Bento from "../src/components/Bento/Bento.jsx";

function App() {
  const movieImgBasePath = "https://image.tmdb.org/t/p/original";
  const apiKey = "7e2c4aa4c12d6fa20f4fe120dba56b78";

  async function getMovieData(url, options) {
    const response = await fetch(url, options);
    const responseJSON = await response.json();
    return responseJSON;
  }

  /* -------------------------------------------------------------------------- */
  /*                           Trending Movies/Series                           */
  /* -------------------------------------------------------------------------- */
  const popularUrl =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=" +
    apiKey;

  const popularOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTJjNGFhNGMxMmQ2ZmEyMGY0ZmUxMjBkYmE1NmI3OCIsIm5iZiI6MTczMjg0MDc3Mi4xMDA4ODc1LCJzdWIiOiI2NzQ3ZGZlNjhiYjg0YWI4MDhjZjg4M2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-e-wOvqK4855KYpoK42g_7hNCnMKiceRBksWNZF86V8",
    },
  };

  const [popularMovies, setPopularMovies] = useState([]);

  // Trending Movies data is ALWAYS retrieved once when the page loads
  useEffect(() => {
    async function fetchTrendingData() {
      const data = await getMovieData(popularUrl, popularOptions);
      setPopularMovies(data.results);
    }

    async function fetchTrailerData() {
      const response = await fetch(videoTrailerUrl, videoTrailerOptions);
      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return;
      }
      const data = await response.json();
      setTrailerVideo(data);
    }
    try {
      fetchTrendingData();
      fetchTrailerData();
    } catch {
      console.error();
    }
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                       Handling input from Search bar                       */
  /* -------------------------------------------------------------------------- */
  // Storing the search result as an empty array by default
  const [searchResults, setSearchResults] = useState([]);

  // What happens when the user submitts a search query
  function handleSearch(query) {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`;
    async function fetchSearchData() {
      const data = await getMovieData(searchUrl);
      setSearchResults(data.results);
      console.log(searchResults);
    }
    try {
      fetchSearchData();
    } catch {
      console.error();
    }
  }

  function handleLogoClick() {
    // reset search results
    setSearchResults([]);
  }

  /* -------------------------------------------------------------------------- */
  /*                               New Trailer API                              */
  /* -------------------------------------------------------------------------- */
  const [trailerVideo, setTrailerVideo] = useState(null);

  const movieId = "1394594";
  const videoTrailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&api_key=${apiKey}`;

  // const baseVideoURL = `http://api.themoviedb.org/3/movie/157336/videos?api_key=`;
  // const videoURL = baseVideoURL + apiKey;

  return (
    <>
      {/* Adding an onSearch Listener to the Navbar*/}
      <Navbar onSearch={handleSearch} onLogoClick={handleLogoClick} />
      <main>
        {searchResults.length > 0 ? (
          <MovieList movies={searchResults} baseImgPath={movieImgBasePath} />
        ) : (
          <>
            <MovieCarousel movies={popularMovies} tag="🔥 Now Trending" />
            <Bento videoURL={videoTrailerUrl} />
          </>
        )}
      </main>
    </>
  );
}

export default App;
