import "../Bento/Bento.css";
import "../SingleMovie/SingleMovie.jsx";
import SingleMovie from "../SingleMovie/SingleMovie.jsx";
import sg from "../../assets/sg.jpeg";

export default function Bento(props) {
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
          <h2>You Might Like</h2>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
