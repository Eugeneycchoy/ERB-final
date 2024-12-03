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

  function handleSortAnimations(e) {
    e.preventDefault();
    props.onAnimationClick();
  }

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
            </button>
          </div>
          {/* call handleSearch when the search button is clicked */}
          <div className="nav-mid"></div>
          <div id="nav-logo" onClick={props.onLogoClick}>
            This<span id="movie-logo">MOVIE</span>
          </div>
        </nav>
        <ul className="nav">
          <li className="nav-item">
            <a onClick={handleSortAnimations} className="nav-link active" aria-current="page" href="#">
              Animation
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Action
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Comedy
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Fantasy
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Sci-Fi
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Romance
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}