import { useCallback, useEffect, useState } from "react";
import "../styles/LastVehiclesAdded.css";

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

export default function LastVehiclesAdded() {
  const [latestVehiclesList, setLatestVehiclesList] = useState<VehiclesProps[]>(
    [],
  );

  const getLastVehiclesAdded = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/vehicles`,
      );
      const data = await response.json();
      setLatestVehiclesList(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getLastVehiclesAdded();
  }, [getLastVehiclesAdded]);

  return (
    <section className="latest-vehicles-added-container">
      <h2>Derniers véhicules ajoutés</h2>
      {latestVehiclesList.map((vehicle) => (
        <article className="latest-vehicles-added-article" key={vehicle.id}>
          <img
            className="latest-vehicles-added-image"
            src={vehicle.image}
            alt={`${vehicle.brand}${vehicle.model}`}
          />
          <div className="latest-vehicles-added-infos">
            <h3 className="latest-vehicles-added-title">
              {vehicle.year} {vehicle.brand} {vehicle.model}
            </h3>
            <p className="latest-vehicles-added-price">{vehicle.price} €</p>
            <button className="latest-vehicles-added-button" type="button">
              Voir plus
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}
