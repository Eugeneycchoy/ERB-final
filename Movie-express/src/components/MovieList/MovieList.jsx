import "../MovieList/MovieList.css";
import cannotFindImg from "../../assets/thismovie.png";
import SingleShow from "../SingleShow/SingleShow";

export default function MovieList({
  shows,
  baseImgPath,
  handleDisplayShowInfoModal,
}) {
  // Sort shows by popularity in descending order
  const sortedShows = [...shows].sort((a, b) => b.popularity - a.popularity);

  // JSX template
  const showElements = sortedShows.map((show) => {
    return (
      <div key={show.id} className="movie-container">
        <div className="movie-container-dark-overlay"></div>

        <SingleShow
          key={show.id}
          show={show}
          baseUrl={baseImgPath}
          imageType="poster"
          handleDisplayShowInfoModal={handleDisplayShowInfoModal}
        />
      </div>
    );
  });

  // JSX output
  return <div className="movie-list-container">{showElements}</div>;
}
