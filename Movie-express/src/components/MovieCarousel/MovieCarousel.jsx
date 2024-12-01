import "../MovieCarousel/MovieCarousel.css";
import SingleShow from "../SingleShow/SingleShow.jsx";

export default function MovieCarousel(props) {
  const basicImgPath = "https://image.tmdb.org/t/p/original";
  // props.movies = [movie, movie, movie...]

  // JSX template
  if (!props.movies) {
    console.log("No movies at the moment :(");
  }

  const movieElements = props.movies.map((movie, index) => {
    const itemClass = index === 0 ? "carousel-item active " : "carousel-item ";
    return (
      <div className={itemClass} key={movie.id}>
        <div className="movie-content">
          <SingleShow
            show={movie}
            baseUrl={basicImgPath}
            imageType="backdrop"
            handleDisplayModal={props.handleDisplayModal}
          />
          <div className="movie-content-text">
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="movie-list-container">
        <h2 id="trending-tag">{props.tag}</h2>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">{movieElements}</div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </>
  );
}
