import "../SingleMovie/SingleMovie.css";
import cannotFindMoviePoster from "../../../public/cannot-find-movie-poster.jpg";

export default function SingleMovie({
  poster = cannotFindMoviePoster, // Remove the curly braces
  title,
  year,
}) {
  return (
    <>
      <div className="movie-container">
        <div className="movie-dark-overlay"></div>
        <img className="movie-poster" src={poster} alt="" />
        <div className="movie-text-content">
          <h3 className="movie-title">{title}</h3>
          <span className="movie-year">{year}</span>
        </div>
      </div>
    </>
  );
}
