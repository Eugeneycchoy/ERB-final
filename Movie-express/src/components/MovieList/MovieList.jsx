import "../MovieList/MovieList.css";
import cannotFindImg from "../../assets/thistv.png";
import SingleShow from "../SingleShow/SingleShow";

export default function MovieList({shows, baseImgPath, handleDisplayModal}) {
  // JSX template
  const showElements = shows.map((show) => {
    return (
      <div key={show.id} className="movie-container">
        <div className="movie-container-dark-overlay"></div>

        <SingleShow
          key={show.id}
          show={show}
          baseUrl={baseImgPath}
          imageType="poster"
          handleDisplayModal={handleDisplayModal}
        />
        
      </div>
    );
  });

  // JSX output
  return <div className="movie-list-container">{showElements}</div>;
}
