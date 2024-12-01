import { useEffect, useState } from "react";
import "../Modal/Modal.css";
import sg from "../../assets/sg.jpeg";
import SingleActor from "../SingleActor/SingleActor";

export default function Modal({
  handleCloseModal,
  show,
  baseImgPath,
  apiOptions,
}) {
  /* -------------------------------------------------------------------------- */
  /*                              Show Details API                              */
  /* -------------------------------------------------------------------------- */

  const showDetailsUrl = show.media_type
    ? `https://api.themoviedb.org/3/tv/${show.id}?language=en-US`
    : `https://api.themoviedb.org/3/movie/${show.id}?language=en-US`;

  const [showDetails, setShowDetails] = useState([]);

  useEffect(() => {
    fetch(showDetailsUrl, apiOptions)
      .then((res) => res.json())
      .then((resJSON) => {
        setShowDetails(resJSON);
      });
  }, [showDetailsUrl]);

  useEffect(() => {
    console.log(showDetails);
  }, [showDetails]);

  // JSX Template
  const showGenresElements = showDetails.genres
    ? showDetails.genres.map((genre) => {
        return <span key={genre.id}>{genre.name}</span>;
      })
    : null;

  /* -------------------------------------------------------------------------- */
  /*                               Show's Cast API                              */
  /* -------------------------------------------------------------------------- */
  const castUrl = show.media_type
    ? `https://api.themoviedb.org/3/tv/${show.id}/credits?language=en-US`
    : `https://api.themoviedb.org/3/movie/${show.id}/credits?language=en-US`;

  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetch(castUrl, apiOptions)
      .then((res) => res.json())
      .then((castData) => setCast(castData.cast));
  }, [cast]);

  const castElements = cast
    ? cast.slice(0, 5).map((person) => {
        return (
          <SingleActor
            key={person.id}
            person={person}
            baseImgPath={baseImgPath}
          />
        );
      })
    : null;

  /* -------------------------------------------------------------------------- */
  /*                             Movie Trailers API                            */
  /* -------------------------------------------------------------------------- */
  const [trailerKey, setTrailerKey] = useState(null);
  const youtubeBasePath = "https://www.youtube.com/watch?v=";
  const showTrailerUrl = show.media_type
    ? `https://api.themoviedb.org/3/tv/${show.id}/videos?language=en-US`
    : `https://api.themoviedb.org/3/movie/${show.id}/videos?language=en-US`;

  useEffect(() => {
    fetch(showTrailerUrl, apiOptions)
      .then((res) => res.json())
      .then((resJSON) => {
        if (resJSON.results && resJSON.results.length > 0) {
          for (let result of resJSON.results) {
            if (result.type.includes("Trailer" || "trailer")) {
              setTrailerKey(result.key);
            } else {
              setTrailerKey(resJSON.results[0].key);
            }
          }
        } else {
          console.log("No trailer found");
        }
      })
      .catch((error) => console.error("Error fetching trailer:", error));
  }, [showTrailerUrl]);

  function playTrailer() {
    if (trailerKey) {
      window.open(youtubeBasePath + trailerKey, "_blank");
    } else {
      console.log("Trailer key is not available");
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                              Movie Gallery API                             */
  /* -------------------------------------------------------------------------- */
  const movieGalleryUrl = `https://api.themoviedb.org/3/movie/${show.id}/images`;
  const [movieGallery, setMovieGallery] = useState([]);
  const [randomImgPath, setRandomImgPath] = useState("");

  useEffect(() => {
    fetch(movieGalleryUrl, apiOptions)
      .then((res) => res.json())
      .then((movieGalleryData) => {
        if (
          movieGalleryData.backdrops &&
          movieGalleryData.backdrops.length > 0
        ) {
          setMovieGallery(movieGalleryData.backdrops);
        } else {
          console.log("Movie Gallery is not available");
        }
      })
      .catch((error) => console.error("Error fetching movie gallery:", error));
  }, [movieGalleryUrl, apiOptions]);

  useEffect(() => {
    if (movieGallery.length > 0) {
      const randomIndex = Math.floor(Math.random() * movieGallery.length);
      setRandomImgPath(baseImgPath + movieGallery[randomIndex].file_path);
    }
  }, [movieGallery, baseImgPath]);
  // JSX Output

  // modal slide down animation "modal-container"

  return (
    <>
      <div
        className="modal-background-overlay"
        onClick={handleCloseModal}
      ></div>
      <div className="modal-container">
        <div className="modal-container-left">
          <div className="tags">
            <span className="year">
              {(show.first_air_date || show.release_date).slice(0, 4)}
            </span>
            <span className="media-type">{show.media_type || "movie"}</span>
            <span className="language">{show.original_language}</span>

            {/* Rating that is 0 will not be shown */}

            {show.vote_average > 0 && (
              <span className="rating">
                {Math.round(show.vote_average * 10) / 10}
              </span>
            )}
          </div>

          <h1 className="title">{show.name || show.title}</h1>

          <div className="genre-tags">{showGenresElements}</div>

          {show.overview && <p className="plot-overview">{show.overview}</p>}

          <div className="cast-list">{castElements}</div>

          {trailerKey && (
            <button className="trailer-button" onClick={playTrailer}>
              Watch Trailer
            </button>
          )}
        </div>
        {!show.media_type ? (
          <img className="show_backdrop_img" src={randomImgPath} alt="" />
        ) : (
          <img
            className="show_backdrop_img"
            src={baseImgPath + show.backdrop_path}
            alt=""
          />
        )}
      </div>
    </>
  );
}
