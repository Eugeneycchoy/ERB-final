import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "../src/components/Navbar/Navbar.jsx";
import MovieCarousel from "../src/components/MovieCarousel/MovieCarousel.jsx";
import MovieList from "../src/components/MovieList/MovieList.jsx";
import Bento from "../src/components/Bento/Bento.jsx";
import Modal from "../src/components/Modal/Modal.jsx";
import Footer from "../src/components/Footer/Footer.jsx";
import axios from "axios";

function App() {
  const movieImgBasePath = "https://image.tmdb.org/t/p/original";
  const youtubeBaseUrl = "https://www.youtube.com/embed/";
  const youtubeTrailerBaseUrl = "https://www.youtube.com/watch?v=";
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
  const [actor, setActor] = useState(null);

  function displayShowInfoModal(show) {
    setShow(show);
    setShowModal(true);
  }

  function displayActorInfoModal(actor) {
    setActor(actor);
    setShowModal(true);
  }
  useEffect(() => {
    console.log(actor);
  }, [actor]);

  function closeModal() {
    setShowModal(false);
    setShow(null);
    setActor(null);
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
  const [searchResults, setSearchResults] = useState([]);

  // What happens when the user submits a search query
  async function handleSearch(query) {
    const movieSearchUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`;
    const actorSearchUrl = `https://api.themoviedb.org/3/search/person?query=${query}&api_key=${apiKey}`;

    try {
      const [movieResponse, actorResponse] = await Promise.all([
        axios.get(movieSearchUrl),
        axios.get(actorSearchUrl),
      ]);

      const movieResults = movieResponse.data.results || [];
      const actorResults = actorResponse.data.results || [];

      // Flatten known_for arrays from actor results
      const knownForResults = actorResults.flatMap(
        (actor) => actor.known_for || []
      );

      const combinedResults = [...movieResults, ...knownForResults];

      setSearchResults(combinedResults);
      console.log(combinedResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function handleLogoClick() {
    // reset search results
    setSearchResults([]);
  }
  /* -------------------------------------------------------------------------- */
  /*                                 Artist API                                 */
  /* -------------------------------------------------------------------------- */
  const topArtistUrl =
    "https://api.themoviedb.org/3/person/popular?language=en-US&page=1";

  // topArtists: Array<Artist>
  const [topArtists, setTopArtists] = useState([]);

  useEffect(
    () => {
      // Fetch and Assign
      async function fetchingTopArtistsData() {
        const topArtistsResponse = await axios.get(topArtistUrl);
        setTopArtists(topArtistsResponse.data.results);
      }

      try {
        fetchingTopArtistsData();
      } catch (e) {
        // Something goes wrong
        console.error(e);
      }
    },
    [] /* Run Once per page reload */
  );

  useEffect(() => {
    console.log(topArtists);
  }, [topArtists]);
  /* -------------------------------------------------------------------------- */
  /*                               New Trailer API                              */
  /* -------------------------------------------------------------------------- */
  // Get a list of the current most popular movies
  // randomly choose one of them to be displayed in the trailer section

  const [trailerVideo, setTrailerVideo] = useState(null);
  const [randomTrailerMovie, setRandomTrailerMovie] = useState("1100782");

  useEffect(() => {
    if (popularMovies && popularMovies.length > 0) {
      const randomMovie =
        popularMovies[Math.floor(Math.random() * popularMovies.length)];
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

  function handleAnimationClick() {
    const animationSearchUrl =
      "https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

    fetch(animationSearchUrl, options)
      .then((res) => res.json())
      .then((resJSON) => {
        const result = [];
        for (let item of resJSON.results) {
          if (item.genre_ids.includes(16)) {
            result.push(item);
          }
          setSearchResults(result);
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      {/* Adding an onSearch Listener to the Navbar*/}
      <Navbar
        onSearch={handleSearch}
        onLogoClick={handleLogoClick}
        onAnimationClick={handleAnimationClick}
        onActionClick={""}
        onComedyClick={""}
      />

      {showModal && show && (
        <Modal
          baseImgPath={movieImgBasePath}
          handleCloseModal={closeModal}
          show={show}
          actor={actor}
          apiOptions={options}
          isOpen={showModal}
          youtubeTrailerBaseUrl={youtubeTrailerBaseUrl}
          modalType="showInfo"
        />
      )}

      {showModal && actor && (
        <Modal
          baseImgPath={movieImgBasePath}
          handleCloseModal={closeModal}
          actor={actor}
          show={show}
          apiOptions={options}
          isOpen={showModal}
          youtubeTrailerBaseUrl={youtubeTrailerBaseUrl}
          modalType="actorInfo"
        />
      )}

      {/* {showModal && actor && (
        <Modal
          baseImgPath={movieImgBasePath}
          handleCloseModal={closeModal}
          actor={actor}
          apiOptions={options}
          isOpen={showModal}
          youtubeTrailerBaseUrl={youtubeTrailerBaseUrl}
          modalType="actorInfo"
        />
      )} */}
      {/* {showModal && (
        <Modal
          baseImgPath={movieImgBasePath}
          handleCloseModal={closeModal}
          show={show}
          apiOptions={options}
          isOpen={showModal}
          youtubeTrailerBaseUrl={youtubeTrailerBaseUrl}
          modalType="showInfo"
        />
      )} */}
      <main>
        {searchResults && searchResults.length > 0 ? (
          <MovieList
            shows={searchResults}
            baseImgPath={movieImgBasePath}
            handleDisplayShowInfoModal={displayShowInfoModal}
          />
        ) : (
          <>
            <MovieCarousel
              movies={popularMovies}
              handleDisplayShowInfoModal={displayShowInfoModal}
              tag="🔥 Now Trending"
            />
            <Bento
              baseUrl={movieImgBasePath}
              artists={topArtists}
              videoURL={trailerVideo}
              tvSeries={tvSeries}
              movies={popularMovies}
              handleDisplayShowInfoModal={displayShowInfoModal}
              handleDisplayActorInfoModal={displayActorInfoModal}
            />
          </>
        )}
      </main>
      <footer></footer>
    </>
  );
}

export default App;
