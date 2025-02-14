import { useCallback, useEffect, useState } from "react";
import "../styles/LastVehiclesAdded.css";
import VehiclesCard from "./OneVehicleCard";

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
        `${import.meta.env.VITE_API_URL}/api/latest-vehicles`,
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
      <article className="list-last-vehicles-container">
        {latestVehiclesList.slice(0, 3).map((vehicle) => (
          <VehiclesCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </article>
    </section>
  );
}
