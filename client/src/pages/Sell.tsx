import { useRef } from "react";
import Navbar from "../components/Navbar";
import "../styles/Sell.css";

export default function Sell() {
  const categoryRef = useRef<HTMLSelectElement>(null);
  const brandRef = useRef<HTMLInputElement>(null);
  const modelRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const mileageRef = useRef<HTMLInputElement>(null);
  const consumptionRef = useRef<HTMLInputElement>(null);
  const transmissionRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    event?.preventDefault();
    const formData = new FormData(
      document.querySelector(".sell-form") as HTMLFormElement,
    );
    try {
      const category_id = await fetch(
        `${import.meta.env.VITE_API_URL}/api/category?name=${categoryRef.current?.value}`,
      );
      const category_idJSON = (await category_id.json())[0].id;

      formData.append("category_id", category_idJSON);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/vehicle/1`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Object.fromEntries(formData)),
        },
      );
      if (!response.ok) {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <section className="sell-section-container">
        <form className="sell-form" onSubmit={handleSubmit}>
          <label htmlFor="category">Catégorie</label>
          <select name="category" id="category" ref={categoryRef}>
            <option value="--">--</option>
            <option value="SUV">SUV</option>
            <option value="Sport">Sport</option>
            <option value="Luxe">Luxe</option>
            <option value="Compact">Compact</option>
            <option value="Hybride">Hybride</option>
            <option value="Electrique">Électrique</option>
            <option value="Utilitaire">Utilitaire</option>
          </select>
          <article className="brand-and-model-input-sell">
            <div id="brand-input">
              <label htmlFor="brand">Marque</label>
              <input type="text" name="brand" id="brand" ref={brandRef} />
            </div>
            <div>
              <label htmlFor="model">Modèle</label>
              <input type="text" name="model" id="model" ref={modelRef} />
            </div>
          </article>
          <article className="year-and-mileage">
            <div id="year-input">
              <label htmlFor="year">Année</label>
              <input
                type="number"
                name="year"
                id="year"
                max={new Date().getFullYear()}
                ref={yearRef}
              />
            </div>
            <div id="mileage-input">
              <label htmlFor="mileage">Kilométrage</label>
              <input
                type="number"
                name="mileage"
                id="mileage"
                ref={mileageRef}
              />
            </div>
          </article>
          <div>
            <label htmlFor="consumption" id="consumption-input">
              Consommation (l/100km)
            </label>
            <input
              type="number"
              name="consumption"
              id="consumption"
              ref={consumptionRef}
            />
          </div>
          <article className="transmission-and-price">
            <div>
              <label htmlFor="transmission">Transmission</label>
              <select
                name="transmission"
                id="transmission"
                ref={transmissionRef}
              >
                <option value="--">--</option>
                <option value="Automatique">Automatique</option>
                <option value="Manuelle">Manuelle</option>
                <option value="Semi-automatique">Semi-automatique</option>
              </select>
            </div>
            <div>
              <label htmlFor="price">Prix</label>
              <input type="number" name="price" id="price" ref={priceRef} />
            </div>
          </article>
          <button className="sell-button-submit" type="submit">
            Mettre en ligne
          </button>
        </form>
      </section>
    </>
  );
}
