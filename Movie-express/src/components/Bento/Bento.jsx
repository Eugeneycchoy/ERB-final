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

  // JSX Template
  const tvSeriesElements = tvSeriesToDisplay.map((tvShow) => {
    if (!tvShow || !tvShow.id || !tvShow.poster_path) {
      console.error("Invalid tvShow data:", tvShow);
      return null;
    }
    return (
      // <div key={tvShow.id}>
      //   <img src={props.baseUrl + tvShow.poster_path} alt={tvShow.name} />
      // </div>
      <div key={tvShow.id}>
        <SingleShow
          show={tvShow}
          baseUrl={baseUrl}
          handleDisplayModal={handleDisplayModal}
        />
      </div>
    );
  });

  const movieElements = moviesToDisplay.map((movie) => {
    if (!movie || !movie.id || !movie.poster_path) {
      console.error("Invalid movie data:", movie);
      return null;
    }
    return (
      // <div key={tvShow.id}>
      //   <img src={props.baseUrl + tvShow.poster_path} alt={tvShow.name} />
      // </div>
      <div key={movie.id}>
        <SingleShow
          show={movie}
          baseUrl={baseUrl}
          handleDisplayModal={handleDisplayModal}
        />
      </div>
    );
  });

  // JSX Output

  // className="hiden-description"

  return (
    <>
      {/* Bento */}
      <div className="movie-bento-container">
        <div className="artrists-container">
          <h2>TOP STARS OF THE WEEK</h2>
          {artists && artists.length >= 3 ? (
            <>
              <div>
                <img src={baseUrl + artists[0].profile_path} alt="" />
              </div>
              <h5 className="hiden-description">Sakura Kimochi</h5>
              <div>
                <img src={baseUrl + artists[1].profile_path} alt="" />
              </div>
              <h5 className="hiden-description small-stars-container">
                <h5>Mia Khalifa</h5>
                <h5> Black Nuggar</h5>
              </h5>
              <div>
                <img src={baseUrl + artists[2].profile_path} alt="" />
              </div>
            </>
          ) : (
            <p>Loading actors...</p>
          )}
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
