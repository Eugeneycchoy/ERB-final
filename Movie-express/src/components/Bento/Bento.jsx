import "../Bento/Bento.css";
import "../SingleTrailer/SingleTrailer.jsx";
import SingleShow from "../SingleShow/SingleShow.jsx";
import { useEffect, useState } from "react";
import SingleTrailer from "../SingleTrailer/SingleTrailer.jsx";

export default function Bento(props) {
  function getUniqueItems(amount, arr) {
    if (amount > arr.length) {
      throw new Error("Amount exceeds the number of available items");
    }

    const shuffledArray = arr.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, amount);
  }

  const [tvSeriesToDisplay, setTvSeriesToDisplay] = useState([]);

  useEffect(() => {
    if (props.tvSeries.length > 0) {
      try {
        const uniqueItems = getUniqueItems(3, props.tvSeries);
        setTvSeriesToDisplay(uniqueItems);
      } catch (error) {
        console.error(error.message);
      }
    }
  }, [props.tvSeries]);

  // JSX Template
  const tvSeriesElements = tvSeriesToDisplay.map((tvShow) => {
    if (!tvShow || !tvShow.id || !tvShow.poster_path) {
      console.error("Invalid tvShow data:", tvShow);
      return null;
    }
    return (
      // <div key={tvShow.id}>
      //   <img src={props.baseUrl + tvShow.poster_path} alt={tvShow.name} />
      // </div>
      <div key={tvShow.id}>
        <SingleShow
          show={tvShow}
          baseUrl={props.baseUrl}
          handleDisplayModal={props.handleDisplayModal}
        />
      </div>
    );
  });

  // JSX Output
  return (
    <>
      {/* Bento */}
      <div className="movie-bento-container">
        <div className="artrists-container">
          <h2>TOP STARS OF THE WEEK</h2>
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
            <p>Loading actors...</p>
          )}
        </div>
        <div className="new-trailer-container">
          <div>
            <SingleTrailer videoURL={props.videoURL} />
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
