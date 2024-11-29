import "../SingleMovie/SingleMovie.css";

export default function SingleMovie(props) {
  const videoURL = props.videoURL;
  return (
    <>
      <div className="single-movie-container">
        <iframe allowFullScreen src={videoURL}></iframe>
      </div>
    </>
  );
}
