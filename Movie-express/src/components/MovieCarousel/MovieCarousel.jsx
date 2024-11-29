import "../MovieCarousel/MovieCarousel.css";

export default function MovieList(props) {
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
          <img
            className="d-block"
            src={basicImgPath + movie.backdrop_path}
            alt={movie.title}
          />
          <div className="movie-img-dark-overlay"></div>
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
        <h2>{props.tag}</h2>
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">{movieElements}</div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </>
  );
}
