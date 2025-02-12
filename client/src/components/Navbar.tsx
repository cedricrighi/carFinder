import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar-container">
      <div className="left-navbar">
        <Link className="link" to="/">
          <h1 className="navbar-website-title">CarFinder</h1>
        </Link>
        <ul className="navbar-links">
          <li>
            <Link className="link" to="/buy">
              Acheter
            </Link>
          </li>
          <li>
            <Link className="link" to="/sell">
              Vendre
            </Link>
          </li>
        </ul>
      </div>
      <button className="button-menu-burger" type="button">
        <p>S'inscrire/</p>
        <p>Se connecter</p>
      </button>
    </nav>
  );
}
