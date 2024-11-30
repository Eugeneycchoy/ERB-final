import "../Bento/Bento.css";
import "../SingleTrailer/SingleTrailer.jsx";
import SingleMovie from "../SingleTrailer/SingleTrailer.jsx";

export default function Bento(props) {
  const tvSeries = [...props.tvSeries];

  function getUniqueItems(amount, arr) {
    if (amount > arr.length) {
      throw new Error("Amount exceeds the number of available items");
    }

    const shuffledArray = arr.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, amount);
  }

  let tvSeriesToDisplay = [];
  try {
    tvSeriesToDisplay = getUniqueItems(3, tvSeries);
  } catch (error) {
    console.error(error.message);
  }

  // JSX Template
  const tvSeriesElements = tvSeriesToDisplay.map((tvShow) => {
    if (!tvShow || !tvShow.id || !tvShow.poster_path) {
      console.error("Invalid tvShow data:", tvShow);
      return null;
    }
    return (
      <div key={tvShow.id}>
        <img src={props.baseUrl + tvShow.poster_path} alt={tvShow.name} />
      </div>
    );
  });

  // JSX Output
  return (
    <>
      {/* Bento */}
      <div className="movie-bento-container">
        <div className="artrists-container">
          <h2>Artists</h2>
          {props.artists && props.artists.length >= 3 ? (
            <>
              <div>
                <img
                  src={props.baseUrl + props.artists[0].profile_path}
                  alt=""
                />
              </div>
              <div>
                <img
                  src={props.baseUrl + props.artists[1].profile_path}
                  alt=""
                />
              </div>
              <div>
                <img
                  src={props.baseUrl + props.artists[2].profile_path}
                  alt=""
                />
              </div>
            </>
          ) : (
            <p>No artists available</p>
          )}
        </div>
        <div className="new-trailer-container">
          <div>
            <SingleMovie videoURL={props.videoURL} />
          </div>
        </div>
        <div className="recommend-container">
          <h2>TV Series Everyone's watching</h2>
          {tvSeriesToDisplay.length > 0 ? tvSeriesElements : <p>No Series</p>}
        </div>
      </div>
    </>
  );
}
