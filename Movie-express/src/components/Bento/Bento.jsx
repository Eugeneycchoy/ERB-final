import "../Bento/Bento.css";
import "../SingleMovie/SingleMovie.jsx";
import SingleMovie from "../SingleMovie/SingleMovie.jsx";

export default function Bento(props) {
  return (
    <>
      {/* Bento */}
      <div className="movie-bento-container">
        <div className="artrists-container">
          <h2>Artists</h2>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="new-trailer-container">
          <div>
            <h2>New Trailer</h2>
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
