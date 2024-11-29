import "../SingleMovie/SingleMovie.css";

export default function SingleMovie(props) {
  const videoURL = props.videoURL;
  return (
    <>
      <div className="single-movie-container">
        <iframe src="https://www.youtube.com/embed/q_MaCi7i180?si=ctFr8P7ruxBRiCUU"></iframe>
      </div>
    </>
  );
}
