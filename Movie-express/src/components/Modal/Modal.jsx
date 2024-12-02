import { useEffect, useState } from "react";
import "../Modal/Modal.css";
import sg from "../../assets/sg.jpeg";
import SingleActor from "../SingleActor/SingleActor";

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
          <h1 className="title">{show.name || show.title}</h1>
          {show.overview && <p className="plot-overview">{show.overview}</p>}
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
