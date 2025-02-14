import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthenticationProvider";
import "../styles/ProfileVehicles.css";
import OneVehicleCardWithDelete from "./OneVehicleCardWithDelete";

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

export default function ProfileVehicles() {
  const { auth } = useAuth();
  const [vehicles, setVehicles] = useState<VehiclesProps[]>([]);

  const fetchVehicles = useCallback(async () => {
    try {
      const vehiclesResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/vehicles/${auth?.user.id}`,
      );
      if (!vehiclesResponse.ok) {
        throw new Error("Vehicles fetch failed");
      }

      const vehiclesData = await vehiclesResponse.json();

      setVehicles(vehiclesData);
    } catch (error) {
      console.error(error);
    }
  }, [auth]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return (
    <section className="profile-vehicles-container">
      {vehicles.map((vehicle) => (
        <OneVehicleCardWithDelete
          key={vehicle.id}
          vehicle={vehicle}
          fetchVehicles={fetchVehicles}
        />
      ))}
    </section>
  );
}
