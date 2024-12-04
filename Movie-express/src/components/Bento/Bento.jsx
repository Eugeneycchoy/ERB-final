import "../Bento/Bento.css";
import "../SingleTrailer/SingleTrailer.jsx";
import SingleShow from "../SingleShow/SingleShow.jsx";
import { useEffect, useState } from "react";
import SingleTrailer from "../SingleTrailer/SingleTrailer.jsx";

export default function Bento({
  tvSeries,
  movies,
  baseUrl,
  videoURL,
  handleDisplayModal,
  artists,
}) {
  // Render out different trending movies and tv shows everytime the page reloads
  function getUniqueItems(amount, arr) {
    if (amount > arr.length) {
      throw new Error("Amount exceeds the number of available items");
    }

    const shuffledArray = arr.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, amount);
  }

  const [tvSeriesToDisplay, setTvSeriesToDisplay] = useState([]);
  const [moviesToDisplay, setMoviesToDisplay] = useState([]);

  useEffect(() => {
    if (tvSeries.length > 0) {
      try {
        const uniqueTvSeries = getUniqueItems(3, tvSeries);
        setTvSeriesToDisplay(uniqueTvSeries);
      } catch (error) {
        console.error(error.message);
      }
    }
  }, [tvSeries]);

  useEffect(() => {
    if (movies.length > 0) {
      try {
        const uniqueMovies = getUniqueItems(3, movies);
        setMoviesToDisplay(uniqueMovies);
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [movies]);

  /* -------------------------------------------------------------------------- */
  /*                                JSX TEMPLATE                                */
  /* -------------------------------------------------------------------------- */
  // Artists
  const artistElements = artists.slice(0, 5).map((artist) => {
    return (
      <div key={artist.id}>
        <img src={baseUrl + artist.profile_path} alt="" />
      </div>
    );
  });

  // Tv Series
  const tvSeriesElements = tvSeriesToDisplay.map((tvShow) => {
    if (!tvShow || !tvShow.id || !tvShow.poster_path) {
      console.error("Invalid tvShow data:", tvShow);
      return null;
    }
    return (
      <div key={tvShow.id}>
        <SingleShow
          show={tvShow}
          baseUrl={baseUrl}
          handleDisplayModal={handleDisplayModal}
        />
      </div>
    );
  });

  // Movies
  const movieElements = moviesToDisplay.map((movie) => {
    if (!movie || !movie.id || !movie.poster_path) {
      console.error("Invalid movie data:", movie);
      return null;
    }
    return (
      <div key={movie.id}>
        <SingleShow
          show={movie}
          baseUrl={baseUrl}
          handleDisplayModal={handleDisplayModal}
        />
      </div>
    );
  });

  /* -------------------------------------------------------------------------- */
  /*                                 JSX OUTPUT                                 */
  /* -------------------------------------------------------------------------- */
  return (
    <>
      {/* Bento */}
      <div className="movie-bento-container">
        <div className="artists-container">
          <h2>TOP STARS OF THE WEEK</h2>
          {artists ? <>{artistElements}</> : <p>Loading actors...</p>}
        </div>
        <div className="new-trailer-container">
          <div>
            <SingleTrailer videoURL={videoURL} />
          </div>
        </div>
        <div className="recommend-container tv-series">
          <h2>Binge-Worthy TV Shows</h2>
          {tvSeriesToDisplay.length > 0 ? tvSeriesElements : <p>No Series</p>}
        </div>
        <div className="recommend-container movies">
          <h2>Latest Movies</h2>
          {moviesToDisplay.length > 0 ? movieElements : <p>No Movies</p>}
        </div>
      </div>
    </>
  );
}
