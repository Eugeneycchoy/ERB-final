import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "../src/components/Navbar/Navbar.jsx";
import MovieCarousel from "../src/components/MovieCarousel/MovieCarousel.jsx";
import MovieList from "../src/components/MovieList/MovieList.jsx";
import Bento from "../src/components/Bento/Bento.jsx";
import Modal from "../src/components/Modal/Modal.jsx";

function App() {
  const movieImgBasePath = "https://image.tmdb.org/t/p/original";
  const youtubeBaseUrl = "https://www.youtube.com/embed/";
  const apiKey = "7e2c4aa4c12d6fa20f4fe120dba56b78";

  async function getMovieData(url, options) {
    const response = await fetch(url, options);
    const responseJSON = await response.json();
    return responseJSON;
  }

  /* -------------------------------------------------------------------------- */
  /*                             Show Modal Overlay                             */
  /* -------------------------------------------------------------------------- */
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(null);

  function displayModal(show) {
    setShow(show);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  /* -------------------------------------------------------------------------- */
  /*                           Trending Movies/Series                           */
  /* -------------------------------------------------------------------------- */
  const popularUrl =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=" +
    apiKey;

  const options = {
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
      const data = await getMovieData(popularUrl, options);
      setPopularMovies(data.results);
    }

    try {
      fetchTrendingData();
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
  /*                                 Artist API                                 */
  /* -------------------------------------------------------------------------- */
  const artistUrl =
    "https://api.themoviedb.org/3/person/popular?language=en-US&page=1";

  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    async function fetchArtistData() {
      const data = await getMovieData(artistUrl, options);
      const artistList = [];
      for (let i = 0; i < 3; i++) {
        artistList.push(data.results[i]);
      }
      console.log(artistList);
      setTopArtists(artistList);
    }
    try {
      fetchArtistData();
    } catch {
      console.error();
    }
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                               New Trailer API                              */
  /* -------------------------------------------------------------------------- */
  // Get a list of the current most popular movies
  // randomly choose one of them to be displayed in the trailer section

  const [trailerVideo, setTrailerVideo] = useState(null);
  const [randomTrailerMovie, setRandomTrailerMovie] = useState("1100782");
  
  useEffect(() => {
    if (popularMovies && popularMovies.length > 0) {
      const randomMovie = popularMovies[Math.floor(Math.random() * popularMovies.length)];
      setRandomTrailerMovie(randomMovie.id);
    }
  }, [popularMovies]);
  
  useEffect(() => {
    if (randomTrailerMovie) {
      const videoTrailerUrl = `https://api.themoviedb.org/3/movie/${randomTrailerMovie}/videos?language=en-US`;
      fetch(videoTrailerUrl, options)
        .then((res) => res.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            setTrailerVideo(youtubeBaseUrl + data.results[0].key);
          }
        })
        .catch((e) => console.error(e.message));
    }
  }, [randomTrailerMovie]);

  // const baseVideoURL = `http://api.themoviedb.org/3/movie/157336/videos?api_key=`;
  // const videoURL = baseVideoURL + apiKey;

  /* -------------------------------------------------------------------------- */
  /*                                  TV Series                                 */
  /* -------------------------------------------------------------------------- */
  const [tvSeries, setTvSeries] = useState([]);

  const tvSeriesUrl =
    "https://api.themoviedb.org/3/trending/tv/day?language=en-US";

  useEffect(() => {
    fetch(tvSeriesUrl, options)
      .then((res) => res.json())
      .then((tvSeriesData) => setTvSeries(tvSeriesData.results));
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                               TV Series's API                              */
  /* -------------------------------------------------------------------------- */

  return (
    <>
      {/* Adding an onSearch Listener to the Navbar*/}
      <Navbar onSearch={handleSearch} onLogoClick={handleLogoClick} />
      {showModal && (
        <Modal
          baseImgPath={movieImgBasePath}
          handleCloseModal={closeModal}
          show={show}
          apiOptions={options}
          isOpen={showModal}
        />
      )}
      <main>
        {searchResults.length > 0 ? (
          <MovieList
            shows={searchResults}
            baseImgPath={movieImgBasePath}
            handleDisplayModal={displayModal}
          />
        ) : (
          <>
            <MovieCarousel
              movies={popularMovies}
              handleDisplayModal={displayModal}
              tag="🔥 Now Trending"
            />
            <Bento
              baseUrl={movieImgBasePath}
              artists={topArtists}
              videoURL={trailerVideo}
              tvSeries={tvSeries}
              movies={popularMovies}
              handleDisplayModal={displayModal}
            />
          </>
        )}
      </main>
    </>
  );
}

export default App;
