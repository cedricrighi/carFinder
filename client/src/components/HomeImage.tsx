// import searchBarSVG from "/icons/icon-searchbar.svg";
import homeCarsImage from "/images/cars-fiat500.png";
import "../styles/HomeImage.css";

export default function HomeImage() {
  return (
    <section className="home-container">
      <img className="home-image" src={homeCarsImage} alt="" />
      <div className="image-home-content">
        <article className="text-into-image-home">
          <h2>Trouvez la voiture de vos rêves.</h2>
          <h2>Comparez. Achetez.</h2>
        </article>
        {/* <article className="search-bar-home">
          <form className="input-container" action="" method="get">
            <input
              className="input-search-bar-home"
              placeholder="Chercher une voiture"
              type="text"
              id="searchInput"
            />
            <button className="search-icon" type="submit">
              <img src={searchBarSVG} alt="Search" />
            </button>
          </form>
        </article> */}
      </div>
    </section>
  );
}
