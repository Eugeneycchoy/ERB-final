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

  function playTrailer() {}

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
          {!show.media_type && (
            <button onClick={playTrailer}>Watch Trailer</button>
          )}
        </div>
        <img
          className="show_backdrop_img"
          src={baseImgPath + show.backdrop_path}
          alt=""
        />
      </div>
    </>
  );
}
