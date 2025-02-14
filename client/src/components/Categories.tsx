import compactIcon from "/icons/icon-compact.svg";
import electricIcon from "/icons/icon-electric.svg";
import hybridIcon from "/icons/icon-hybrid.svg";
import luxuryIcon from "/icons/icon-luxury.svg";
import raceIcon from "/icons/icon-race.svg";
import iconUtils from "/icons/icon-utils.svg";
import "../styles/Categories.css";
import { Link } from "react-router-dom";

export default function Categories() {
  const categories = [
    {
      id: 2,
      img: raceIcon,
      name: "Sport",
    },
    {
      id: 3,
      img: luxuryIcon,
      name: "Luxe",
    },
    {
      id: 4,
      img: compactIcon,
      name: "Compact",
    },
    {
      id: 5,
      img: hybridIcon,
      name: "Hybride",
    },
    {
      id: 6,
      img: electricIcon,
      name: "Électrique",
    },
    {
      id: 7,
      img: iconUtils,
      name: "Utilitaire",
    },
  ];

  return (
    <section className="categories-home-container">
      <h2>Catégories</h2>
      <div className="categories-list-container">
        {categories.map((category) => (
          <Link to={`/category/${category.id}`} key={category.id}>
            <article className="category-card">
              <img
                className="category-image"
                src={category.img}
                alt={category.name}
              />
              <p>{category.name}</p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
