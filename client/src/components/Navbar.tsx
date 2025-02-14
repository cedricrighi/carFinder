import { Link } from "react-router-dom";
import "../styles/Navbar.scss";
import CloudSVG from "/icons/cloud.svg";
import GTR35 from "/icons/nissan-gtr35.svg";
import { useAuth } from "../contexts/AuthenticationProvider";

export default function Navbar() {
  const { auth } = useAuth();

  return (
    <div className="navbar-with-gtr35">
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
        {!auth ? (
          <Link to="/login" className="button-menu-burger" type="button">
            <p>S'inscrire/</p>
            <p>Se connecter</p>
          </Link>
        ) : (
          <Link
            to={"/profile"}
            className="button-menu-vers-profil"
            type="button"
          >
            <p>Mon profil</p>
          </Link>
        )}
      </nav>
      <div className="div-for-gtr35">
        <div className="div-to-make-gtr35-smoking">
          <div className="cloud">
            <img className="cloud-for-gtr35-1" src={CloudSVG} alt="" />
            <img className="cloud-for-gtr35-2" src={CloudSVG} alt="" />
            <img className="cloud-for-gtr35-3" src={CloudSVG} alt="" />
            <img className="cloud-for-gtr35-4" src={CloudSVG} alt="" />
            <img className="cloud-for-gtr35-5" src={CloudSVG} alt="" />
            <img className="cloud-for-gtr35-6" src={CloudSVG} alt="" />
            <img className="cloud-for-gtr35-7" src={CloudSVG} alt="" />
            <img className="cloud-for-gtr35-8" src={CloudSVG} alt="" />
            <img className="cloud-for-gtr35-9" src={CloudSVG} alt="" />
            <img className="cloud-for-gtr35-10" src={CloudSVG} alt="" />
            <img className="cloud-for-gtr35-11" src={CloudSVG} alt="" />
            <img className="cloud-for-gtr35-12" src={CloudSVG} alt="" />
            <img className="cloud-for-gtr35-13" src={CloudSVG} alt="" />
            <img className="cloud-for-gtr35-14" src={CloudSVG} alt="" />
            <img className="cloud-for-gtr35-15" src={CloudSVG} alt="" />
            <img className="cloud-for-gtr35-16" src={CloudSVG} alt="" />
            <img className="cloud-for-gtr35-17" src={CloudSVG} alt="" />
            <img className="cloud-for-gtr35-18" src={CloudSVG} alt="" />
            <img className="cloud-for-gtr35-19" src={CloudSVG} alt="" />
            <img className="cloud-for-gtr35-20" src={CloudSVG} alt="" />
          </div>
          <img className="nissan-gtr-35" src={GTR35} alt="gtr35" />
        </div>
      </div>
    </div>
  );
}
