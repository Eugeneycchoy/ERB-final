import { useEffect, useState } from "react";
import "../Modal/Modal.css";
import sg from "../../assets/sg.jpeg";
import SingleActor from "../SingleActor/SingleActor";
import cannotFindImg from "../../../public/cannot-find-movie-poster.jpg";

export default function Modal({
  handleCloseModal,
  show,
  baseImgPath,
  apiOptions,
  isOpen,
}) {
  useEffect(() => {
    console.log(show);
  }, [show]);

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
  }, [show.id, show.media_type, apiOptions]);

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
  /*                               Show's Cast API                              */
  /* -------------------------------------------------------------------------- */
  const [showCast, setShowCast] = useState([]); // showCast.cast for the actors

  const showCastUrl = show.media_type
    ? `https://api.themoviedb.org/3/tv/${show.id}/credits?language=en-US`
    : `https://api.themoviedb.org/3/movie/${show.id}/credits?language=en-US`;

  useEffect(() => {
    fetch(showCastUrl, apiOptions)
      .then((res) => res.json())
      .then((resJSON) => setShowCast(resJSON))
      .catch((error) => console.error("Error fetching details:", error));
  }, [show.id, show.media_type, apiOptions]);

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
  /*                                Movie Gallery                               */
  /* -------------------------------------------------------------------------- */
  const [backdropImg, setBackdropImg] = useState(null);

  // Retrieving show's backdropImg
  useEffect(() => {
    setBackdropImg(baseImgPath + show.backdrop_path);
  }, [backdropImg]);

  return (
    <>
      <div
        className={`modal-background-overlay ${
          animate ? "fade-in" : "fade-out"
        }`}
        onClick={handleClose}
      ></div>
      <div className={`modal-container ${animate ? "slide-in" : "slide-out"}`}>
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
          <button className="trailer-button">Watch Trailer</button>
        </div>

        {/* Background image */}
        <img
          className="show_backdrop_img"
          src={backdropImg ? backdropImg : cannotFindImg}
          alt=""
        />
      </div>
    </>
  );
}
