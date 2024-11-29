import "../Bento/Bento.css";

export default function Bento() {
  return (
    <>
      {/* Bento */}
      <div className="movie-bento-container">
        <div className="nowplaying-container">
          <h2>Now Playing </h2>
        </div>
        <div className="recently-container">
          <h2>Continue Watching</h2>
        </div>
        <div className="recommend-container">
          <h2>You Might Like</h2>
        </div>
      </div>
    </>
  );
}
