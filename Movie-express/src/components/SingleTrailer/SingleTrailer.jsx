import "./SingleTrailer.css";

export default function SingleTrailer(props) {
  const videoURL = props.videoURL;
  return (
    <>
      <div className="single-trailer-container">
        <iframe allowFullScreen src={videoURL}></iframe>
      </div>
    </>
  );
}
