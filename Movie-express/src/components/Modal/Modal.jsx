import { useEffect, useState } from "react";
import "../Modal/Modal.css";
import sg from "../../assets/sg.jpeg";
import SingleActor from "../SingleActor/SingleActor";

export default function Modal({ handleCloseModal, show, baseImgPath }) {
  /* -------------------------------------------------------------------------- */
  /*                              Show Details API                              */
  /* -------------------------------------------------------------------------- */

  const showDetailsUrl = show.media_type
    ? `https://api.themoviedb.org/3/tv/${show.id}?language=en-US`
    : `https://api.themoviedb.org/3/movie/${show.id}?language=en-US`;

  const showDetailsOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTJjNGFhNGMxMmQ2ZmEyMGY0ZmUxMjBkYmE1NmI3OCIsIm5iZiI6MTczMjg5MzA3OS42NDI3ODI3LCJzdWIiOiI2NzQ3ZGZlNjhiYjg0YWI4MDhjZjg4M2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.sfnRZ_raRUd8IfLJ7XPuXg0wpBtlGeWxqAuWr_0fBhc",
    },
  };

  const [showDetails, setShowDetails] = useState([]);

  useEffect(() => {
    fetch(showDetailsUrl, showDetailsOptions)
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
  const castOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTJjNGFhNGMxMmQ2ZmEyMGY0ZmUxMjBkYmE1NmI3OCIsIm5iZiI6MTczMjg5MzA3OS42NDI3ODI3LCJzdWIiOiI2NzQ3ZGZlNjhiYjg0YWI4MDhjZjg4M2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.sfnRZ_raRUd8IfLJ7XPuXg0wpBtlGeWxqAuWr_0fBhc",
    },
  };

  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetch(castUrl, castOptions)
      .then((res) => res.json())
      .then((castData) => setCast(castData.cast));
  }, [cast]);

  const castElements = cast
    ? cast.slice(0, 5).map((person) => {
        return <SingleActor person={person} baseImgPath={baseImgPath} />;
      })
    : null;

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
