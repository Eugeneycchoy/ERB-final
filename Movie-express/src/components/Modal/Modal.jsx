import "../Modal/Modal.css";

export default function Modal({ handleCloseModal, show, baseImgPath }) {
  return (
    <>
      <div
        className="modal-background-overlay"
        onClick={handleCloseModal}
      ></div>
      <div className="modal-container">
        <div className="modal-container-left">
          <div className="tags">
            <span>{show.first_air_date || show.release_date}</span>
            <span>{show.media_type || "movie"}</span>
            <span>{show.original_language}</span>
            <span>{show.vote_average}</span>
          </div>
          <h1 className="title">{show.name || show.title}</h1>
          <div className="genre-tags">
            <span>{show.genre_ids[0]}</span>
            <span>{show.genre_ids[1] || null}</span>
            <span>{show.genre_ids[2] || null}</span>
          </div>
          <p className="plot-overview">{show.overview}</p>
        </div>
        <img src={baseImgPath + show.backdrop_path} alt="" />
      </div>
    </>
  );
}
