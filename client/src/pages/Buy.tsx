import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/Buy.css";

interface Category {
  id: number;
  name: string;
}

interface VehiclesProps {
  id: number;
  image: string;
  brand: number;
  model: string;
  year: number;
  mileage: number;
  consumption: number;
  transmission: string;
  price: number;
}

export default function Buy() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<{ brand: string }[]>([]);
  const [years, setYears] = useState<{ year: number }[]>([]);
  const [vehicles, setVehicles] = useState<VehiclesProps[]>([]);
  const filterCategoryRef = useRef<HTMLSelectElement>(null);
  const filterBrandRef = useRef<HTMLSelectElement>(null);
  const filterYearRef = useRef<HTMLSelectElement>(null);
  const filterTransmissionRef = useRef<HTMLSelectElement>(null);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/category`,
      );
      if (!response.ok) {
        throw new Error("Categories fetch failed");
      }
      setCategories(await response.json());
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchBrands = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/brands`,
      );
      if (!response.ok) {
        throw new Error("Brands fetch failed");
      }
      setBrands(await response.json());
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchYears = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/filters/years`,
      );
      if (!response.ok) {
        throw new Error("Years fetch failed");
      }
      setYears(await response.json());
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchVehicles = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/vehicles/search?${filterCategoryRef.current?.value !== "default" ? `category_id=${filterCategoryRef.current?.value}` : ""}${filterBrandRef.current?.value !== "default" ? `&brand=${filterBrandRef.current?.value}` : ""}${filterYearRef.current?.value !== "default" ? `&year=${filterYearRef.current?.value}` : ""}${filterTransmissionRef.current?.value !== "default" ? `&transmission=${filterTransmissionRef.current?.value}` : ""}`,
      );
      if (!response.ok) {
        throw new Error("Vehicles fetch failed");
      }
      const vehicles = await response.json();
      setVehicles(vehicles);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchYears();
    fetchBrands();
  }, [fetchCategories, fetchYears, fetchBrands]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  useEffect(() => {
    const handleFilterChange = () => {
      fetchVehicles();
    };

    const categorySelect = filterCategoryRef.current;
    const brandSelect = filterBrandRef.current;
    const yearSelect = filterYearRef.current;
    const transmissionSelect = filterTransmissionRef.current;

    categorySelect?.addEventListener("change", handleFilterChange);
    brandSelect?.addEventListener("change", handleFilterChange);
    yearSelect?.addEventListener("change", handleFilterChange);
    transmissionSelect?.addEventListener("change", handleFilterChange);

    return () => {
      categorySelect?.removeEventListener("change", handleFilterChange);
      brandSelect?.removeEventListener("change", handleFilterChange);
      yearSelect?.removeEventListener("change", handleFilterChange);
      transmissionSelect?.removeEventListener("change", handleFilterChange);
    };
  }, [fetchVehicles]);

  return (
    <>
      <Navbar />
      <section className="buy-section-container">
        <article className="filters-buy">
          <h2>Filtres</h2>
          <div className="filters" id="filters">
            <div className="filter-category">
              <select name="category-select" ref={filterCategoryRef}>
                <option value="default">Catégorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select name="brand" id="brand-select-input" ref={filterBrandRef}>
                <option value="default">Marque</option>
                {brands
                  .sort((a, b) => a.brand.localeCompare(b.brand))
                  .map((brand) => (
                    <option key={brand.brand} value={brand.brand}>
                      {brand.brand}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <select name="year" id="year" ref={filterYearRef}>
                <option value="default">Année</option>
                {years
                  .sort((a, b) => a.year - b.year)
                  .map((year) => (
                    <option key={year.year} value={year.year}>
                      {year.year}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <select
                name="transmission"
                id="transmission"
                ref={filterTransmissionRef}
              >
                <option value="default">Transmission</option>
                <option value="manuelle">Manuelle</option>
                <option value="automatique">Automatique</option>
                <option value="semi-automatique">Semi-automatique</option>
              </select>
            </div>
          </div>
        </article>

        <section className="filter-vehicles-list">
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <article
                className="latest-vehicles-added-article"
                key={vehicle.id}
              >
                <img
                  className="latest-vehicles-added-image"
                  src={vehicle.image}
                  alt={`${vehicle.brand}${vehicle.model}`}
                />
                <div className="latest-vehicles-added-infos">
                  <h3 className="latest-vehicles-added-title">
                    {vehicle.year} {vehicle.brand} {vehicle.model}
                  </h3>
                  <p className="latest-vehicles-added-price">
                    {vehicle.price} €
                  </p>
                  <button
                    className="latest-vehicles-added-button"
                    type="button"
                  >
                    Voir plus
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="empty-vehicle-filter-list">Aucun véhicule trouvé.</p>
          )}
        </section>
      </section>
    </>
  );
}
