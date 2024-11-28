import "../Navbar/Navbar.css";

export default function Navbar() {
  return (
    <>
      <div className="navbar-container">
        <nav class="navbar-top">
          <input class="search-box" type="text" placeholder="Search Movies" />
          <div class="nav-mid"></div>
          <div id="nav-logo">
            This<span id="movie-logo">MOVIE</span>
          </div>
        </nav>
        {/* 分類 */}
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              Home
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              TV Shows
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Moives
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Channels
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#">
              My List
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Adult
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
