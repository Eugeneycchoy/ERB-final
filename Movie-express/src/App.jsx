import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "../src/components/Navbar/Navbar.jsx";
import MovieCarousel from "../src/components/MovieCarousel/MovieCarousel.jsx";
import MovieList from "../src/components/MovieList/MovieList.jsx";
import Bento from "../src/components/Bento/Bento.jsx";

function App() {
  const movieImgBasePath = "https://image.tmdb.org/t/p/original";

  const apiKey = "7e2c4aa4c12d6fa20f4fe120dba56b78";
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

  async function getMovieData(url, options) {
    const response = await fetch(url, options);
    const responseJSON = await response.json();
    return responseJSON;
  }

  const [popularMovies, setPopularMovies] = useState([]);

  // Trending Movies data is ALWAYS retrieved once when the page loads
  useEffect(() => {
    async function fetchData() {
      const data = await getMovieData(popularUrl, popularOptions);
      setPopularMovies(data.results);
    }
    try {
      fetchData();
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

  return (
    <>
      {/* Adding an onSearch Listener to the Navbar*/}
      <Navbar onSearch={handleSearch} onLogoClick={handleLogoClick} />
      <main>
        {/*Conditional Rendering
          if searchResult is empty
            display home screen
          otherwise
            display search results*/}

        {searchResults.length > 0 ? (
          <MovieList movies={searchResults} baseImgPath={movieImgBasePath} />
        ) : (
          <>
            <MovieCarousel movies={popularMovies} tag="🔥 Now Trending" />
            <Bento />
          </>
        )}
      </main>
    </>
  );
}

export default App;
