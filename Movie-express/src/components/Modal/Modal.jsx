import { useEffect, useState } from "react";
import "../Modal/Modal.css";
import sg from "../../assets/sg.jpeg";
import SingleActor from "../SingleActor/SingleActor";
import cannotFindImg from "../../assets/thismovie.png";
import axios from "axios";

export default function Modal({
  handleCloseModal,
  show,
  actor,
  baseImgPath,
  apiOptions,
  isOpen,
  youtubeTrailerBaseUrl,
  modalType,
}) {
  // useEffect(() => {
  //   console.log(show);
  // }, [show]);

  // useEffect(() => {
  //   console.log(actor);
  // }, [actor]);

  const [animate, setAnimate] = useState(false);

  // Trigger animation when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
    } else {
      setAnimate(false); // Reset animation when modal is closed
    }
  }, [isOpen]);

  // Close modal after animation ends
  function handleClose() {
    setAnimate(false);
    setTimeout(() => {
      handleCloseModal();
    }, 300); // Match the CSS animation duration
  }

  /* -------------------------------------------------------------------------- */
  /*                              Show's Detail API                             */
  /* -------------------------------------------------------------------------- */
  const [details, setDetails] = useState([]);

  useEffect(() => {
    if (show) {
      let detailsUrl;
      if (show.media_type === "tv") {
        detailsUrl = `https://api.themoviedb.org/3/tv/${show.id}?language=en-US`;
      } else {
        detailsUrl = `https://api.themoviedb.org/3/movie/${show.id}?language=en-US`;
      }
      fetch(detailsUrl, apiOptions)
        .then((res) => res.json())
        .then((resJSON) => setDetails(resJSON))
        .catch((error) => console.error("Error fetching details:", error));
    } else {
      let detailsUrl =
        "https://api.themoviedb.org/3/search/person?query=henry%20cavill&include_adult=false&language=en-US&page=1"; // actor url
      fetch(detailsUrl, apiOptions)
        .then((res) => res.json())
        .then((resJSON) => setDetails(resJSON))
        .catch((error) => console.error("Error fetching details:", error));
    }
  }, [show, actor, apiOptions]);

  useEffect(() => {
    console.log(details);
  }, [details]);

  const genreTagElements = details.genres ? (
    details.genres.map((genre) => <span key={genre.id}>{genre.name}</span>)
  ) : (
    <p>Loading...</p>
  );

  const durationElement = details.runtime ? (
    <p>
      {Math.floor(details.runtime / 60)}hr {details.runtime % 60} minutes
    </p>
  ) : (
    <p>Loading</p>
  );

  const lastEpisode = details.last_episode_to_air
    ? details.last_episode_to_air.name
    : null;

  /* -------------------------------------------------------------------------- */
  /*                             Actor's Details API                            */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                               Show's Cast API                              */
  /* -------------------------------------------------------------------------- */
  const [showCast, setShowCast] = useState([]);

  useEffect(() => {
    if (show) {
      const showCastUrl =
        show.media_type === "tv"
          ? `https://api.themoviedb.org/3/tv/${show.id}/credits?language=en-US`
          : `https://api.themoviedb.org/3/movie/${show.id}/credits?language=en-US`;
      fetch(showCastUrl, apiOptions)
        .then((res) => res.json())
        .then((resJSON) => setShowCast(resJSON))
        .catch((error) => console.error("Error fetching details:", error));
    }
  }, [show, apiOptions]);

  useEffect(() => {
    console.log(showCast);
  }, [showCast]);

  function showActorName(id) {
    document.querySelector(`.actor-name-${id}`).classList.remove("hide");
  }

  function hideActorName(id) {
    document.querySelector(`.actor-name-${id}`).classList.add("hide");
  }

  const castElements = showCast.cast
    ? showCast.cast.slice(0, 5).map((person, index) => {
        return (
          <div className="actor-container" key={person.id}>
            <img
              onMouseEnter={() => showActorName(index)}
              onMouseOut={() => hideActorName(index)}
              src={baseImgPath + person.profile_path}
              alt=""
            />
            <div className={`actor-name actor-name-${index} hide`}>
              {person.name}
            </div>
          </div>
        );
      })
    : "Loading";

  /* -------------------------------------------------------------------------- */
  /*                     Watch Trailer Button API                               */
  /* -------------------------------------------------------------------------- */
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    if (show) {
      const movieTrailerUrl = `https://api.themoviedb.org/3/movie/${show.id}/videos?language=en-US&api_key=7e2c4aa4c12d6fa20f4fe120dba56b78`;
      const tvSeriesTrailerUrl = `https://api.themoviedb.org/3/tv/${show.id}/videos?language=en-US&api_key=7e2c4aa4c12d6fa20f4fe120dba56b78`;
      const trailerUrl =
        show.media_type === "tv" ? tvSeriesTrailerUrl : movieTrailerUrl;
      fetch(trailerUrl, apiOptions)
        .then((res) => res.json())
        .then((resJSON) => {
          if (resJSON.results && resJSON.results.length > 0) {
            const trailer = resJSON.results.find((result) =>
              result.type.toLowerCase().includes("trailer")
            );
            setTrailerKey(trailer ? trailer.key : resJSON.results[0].key);
          } else {
            console.log("No trailer found");
          }
        })
        .catch((error) => console.error("Error fetching trailer:", error));
    }
  }, [show, apiOptions]);

  function handleWatchTrailer() {
    window.open(youtubeTrailerBaseUrl + trailerKey, "_blank");
  }

  /* -------------------------------------------------------------------------- */
  /*                                Movie Gallery                               */
  /* -------------------------------------------------------------------------- */
  const [backdropImg, setBackdropImg] = useState(null);

  // Retrieving show's backdropImg
  useEffect(() => {
    if (show) {
      setBackdropImg(baseImgPath + show.backdrop_path);
    }
  }, [backdropImg]);

  return (
    <>
      <div
        className={`modal-background-overlay ${
          animate ? "fade-in" : "fade-out"
        }`}
        onClick={() => {
          handleClose();
          handleCloseModal;
        }}
      ></div>
      {modalType === "showInfo" ? (
        <div
          className={`modal-container ${animate ? "slide-in" : "slide-out"}`}
        >
          <div className="modal-container-left">
            <div className="tags">
              <span className="year">
                {(show.first_air_date || show.release_date).slice(0, 4)}
              </span>
              <span className="media-type">{show.media_type || "movie"}</span>
              <span className="language">{show.original_language}</span>
              {show.vote_average > 0 && (
                <span className="rating">
                  {Math.round(show.vote_average * 10) / 10}
                </span>
              )}
            </div>

            {/* Show's H1 title */}
            <h1 className="title">{show.name || show.title}</h1>

            {/* Show's runtime */}
            {show.media_type ? (
              <div className="last-episode">
                <p>Latest episode: {lastEpisode}</p>
              </div>
            ) : (
              <div className="shows-duration">{durationElement}</div>
            )}

            {/* Show's Genres */}
            <div className="genre-tags">{genreTagElements}</div>

            {/* Show's overview */}
            {show.overview && <p className="plot-overview">{show.overview}</p>}

            {/* Cast members */}
            <div className="cast-list">{castElements}</div>

            {/* Watch Trailer Button */}
            <button onClick={handleWatchTrailer} className="trailer-button">
              Watch Trailer
            </button>
          </div>

          {/* Background image */}
          <img
            className="show_backdrop_img"
            src={
              backdropImg
                ? !backdropImg.includes("null")
                  ? backdropImg
                  : cannotFindImg
                : "Loading"
            }
            alt=""
          />
        </div>
      ) : (
        // Actor's Modal
        <div
          className={`modal-container ${
            animate ? "slide-in" : "slide-out"
          } actor`}
        >
          <div className="modal-container-left">
            <h1>{actor.name}</h1>
          </div>
        </div>
      )}
    </>
  );
}
