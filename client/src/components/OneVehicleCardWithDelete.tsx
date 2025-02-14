import { Link } from "react-router-dom";
import "../styles/OneVehicleCardWithDelete.css";
import TrashIconSVG from "/icons/trash-icon.svg";

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

interface Vehicles {
  vehicle: VehiclesProps;
  fetchVehicles: () => void;
}

export default function OneVehicleCardWithDelete({
  vehicle,
  fetchVehicles,
}: Vehicles) {
  const handleDelete = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/vehicle/${vehicle.id}`, {
        method: "DELETE",
      });

      fetchVehicles();
    } catch (error) {
      console.error("Error while deleting vehicle");
    }
  };

  return (
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
        <div className="latest-vehicles-added-buttons">
          <Link
            className="link-to-fullcard-vehicle"
            style={{ width: "fit-content" }}
            to={`/vehicle/${vehicle.id}`}
          >
            <button className="latest-vehicles-added-button" type="button">
              Voir plus
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="latest-vehicles-added-button-delete"
            type="button"
          >
            <img src={TrashIconSVG} alt="" />
          </button>
        </div>
      </div>
    </article>
  );
}
