import { useEffect, useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";

// import components
import Navbar from "../src/components/Navbar/Navbar.jsx";
import SingleMovie from "../src/components/SingleMovie/SingleMovie.jsx";

function App() {
  const [movies, setMovies] = useState([]);

  const [url, setUrl] = useState(
    "http://www.omdbapi.com/?s=star wars&apikey=b659da55"
  );

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMovies(data.Search));
  }, []);

  // jsx template
  const movieElements = movies.map((movie) => {
    return (
      <SingleMovie
        poster={movie.Poster}
        title={movie.Title}
        year={movie.Year}
      />
    );
  });

  // jsx output
  return (
    <>
      <Navbar />
      <h2>Search result: "harry potter"</h2>
      <div className="movie-slider">{movieElements}</div>
    </>
  );
}

export default App;
