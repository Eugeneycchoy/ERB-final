import "../Bento/Bento.css";

export default function Bento() {
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
