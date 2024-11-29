import "../MovieList/MovieList.css";
import cannotFindImg from "../../assets/thistv.png";

export default function MovieList(props) {
  // JSX template
  const movieElements = props.movies.map((movie) => {
    return (
      <div className="movie-container">
        <div className="movie-container-dark-overlay"></div>
        <img
          src={
            (props.baseImgPath + movie.poster_path).includes("originalnull")
              ? cannotFindImg
              : props.baseImgPath + movie.poster_path
          }
          alt=""
        />
      </div>
    );
  });

  // JSX output
  return <div className="movie-list-container">{movieElements}</div>;
}
