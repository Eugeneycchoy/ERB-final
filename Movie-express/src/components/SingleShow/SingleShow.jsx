import "../SingleShow/SingleShow.css";
import sg from "../../assets/sg.jpeg";

export default function SingleShow({ show, baseUrl, imageType }) {
  function handleClick() {
    console.log(show.name || show.title);
  }

  return (
    <>
      <img
        className="single-show-img"
        key={show.id}
        src={
          imageType === "backdrop"
            ? baseUrl + show.backdrop_path
            : baseUrl + show.poster_path
        }
        alt=""
        onClick={handleClick}
      />
    </>
  );
}
