import React, { useState } from "react";
import "./Navbar.css";
import searchbtn from "../../assets/search-button-logo.svg";

export default function Navbar(props) {
  // Nothing is typed in by the user
  const [query, setQuery] = useState("");

  // Tracking the value in the input field
  function handleInputChange(e) {
    setQuery(e.target.value);
  }

  // Search button is pressed
  const handleSearch = () => {
    props.onSearch(query);
  };

  return (
    <>
      <div className="navbar-container">
        <nav className="navbar-top">
          <div className="search-container">
            <input
              className="search-box"
              type="text"
              value={query} /* Give this element a variable name */
              onChange={handleInputChange} /* call handleInputChange */
              placeholder="Search Movies"
            />
            <button onClick={handleSearch}>
              <img src={searchbtn} alt="Search" />
            </button>{" "}
          </div>
          {/* call handleSearch when the serach button is clicked*/}
          <div className="nav-mid"></div>
          <div id="nav-logo" onClick={props.onLogoClick}>
            This<span id="movie-logo">TV</span>
          </div>
        </nav>
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              TV Shows
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Movies
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Channels
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              My List
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Adult
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
