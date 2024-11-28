import "../Navbar/Navbar.css";

export default function Navbar() {
  return (
    <>
      <div className="navbar-container">
        <nav class="navbar-top">
          <div id="nav-logo">This.Movie</div>
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
                Recently Watched
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
        </nav>
      </div>
    </>
  );
}
