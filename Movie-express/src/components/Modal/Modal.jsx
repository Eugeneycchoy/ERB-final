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
  /*                                Movie Gallery                               */
  /* -------------------------------------------------------------------------- */
  const [showBackgroundImg, setShowBackgroundImg] = useState(null);
  const showBackdropImgUrl = `https://api.themoviedb.org/3/movie/${show.id}/images`;

  useEffect(() => {
    fetch(showBackdropImgUrl, apiOptions)
      .then((res) => res.json())
      .then((resJSON) => {
        const posters = resJSON.posters;
        const backdrops = resJSON.backdrops;
        try {
          if (posters.length > 0) {
            const randomPosterPath =
              posters[Math.floor(Math.random() * posters.length)].file_path;
            setShowBackgroundImg(baseImgPath + randomPosterPath);
          } else if (backdrops.length > 0) {
            const randomBackdropPath =
              backdrops[Math.floor(Math.random() * backdrops.length)].file_path;
            setShowBackgroundImg(baseImgPath + randomBackdropPath);
          } else {
            setShowBackgroundImg(cannotFindImg);
          }
        } catch (e) {
          console.error(e);
        }
      })
      .catch((error) => console.error("Error fetching poster:", error));
  }, [showBackdropImgUrl, apiOptions, baseImgPath]);

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

          {/* Show's overview */}
          {show.overview && <p className="plot-overview">{show.overview}</p>}
        </div>

        {/* Background image */}
        {(baseImgPath + show.backdrop_path).includes("originalnull") ? (
          <img className="show_backdrop_img" src={showBackgroundImg} alt="" />
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
