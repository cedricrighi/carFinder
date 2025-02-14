import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/VehicleInfos.css";
import ArrowLeftSVG from "/icons/arrow-left.svg";

interface Vehicle {
  id: number;
  image: string;
  brand: number;
  model: string;
  year: number;
  mileage: number;
  consumption: number;
  transmission: string;
  price: number;
  user_id: number;
}

interface Seller {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
}

export default function VehicleInfos() {
  const { vehicle_id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [seller, setSeller] = useState<Seller | null>(null);

  const getVehicleInfos = useCallback(async () => {
    try {
      const vehicleResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/vehicle/${vehicle_id}`,
      );

      const vehicleJson = await vehicleResponse.json();

      setVehicle(vehicleJson);

      const sellerResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user-id/${vehicleJson.user_id}`,
      );

      const sellerData = await sellerResponse.json();

      setSeller(sellerData[0]);
    } catch (error) {
      console.error(error);
    }
  }, [vehicle_id]);

  useEffect(() => {
    getVehicleInfos();
  }, [getVehicleInfos]);

  return (
    <>
      <Navbar />
      <button
        className="prev-button-infos-card"
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        <img className="prev-img-infos-card" src={ArrowLeftSVG} alt="" />
        <p className="prev-text-infos-card"> Retour</p>
      </button>
      <section className="vehicle-info-card-container">
        {vehicle && (
          <>
            <img
              className="infos-vehicle-photos"
              src={vehicle.image}
              alt="polo"
            />
            <article>
              <h3 className="infos-vehicle-title">
                {vehicle.year} {vehicle.brand} {vehicle.model}
              </h3>
              <p className="infos-vehicle-price">Price: {vehicle.price} €</p>
              <div className="engine-infos">
                <p>Kilométrage: {vehicle.mileage} km</p>
                <p>Consommation: {vehicle.consumption} L/100km</p>
                <p>Transmission: {vehicle.transmission}</p>
              </div>
            </article>
          </>
        )}
        {seller && (
          <article className="infos-vehicle-seller-card">
            <h3 className="seller-card-title">Vendeur:</h3>
            <p>
              {seller.first_name} {seller.last_name}
            </p>
            <p>Contact: {seller.phone_number}</p>
            <button className="seller-contact-buy" type="button">
              Acheter
            </button>
          </article>
        )}
      </section>
    </>
  );
}
