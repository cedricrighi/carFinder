import { Link } from "react-router-dom";
import "../styles/OneVehicleCard.css";

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
}

export default function OneVehicleCard({ vehicle }: Vehicles) {
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
        <Link
          className="link-to-fullcard-vehicle"
          to={`/vehicle/${vehicle.id}`}
        >
          <button className="latest-vehicles-added-button" type="button">
            Voir plus
          </button>
        </Link>
      </div>
    </article>
  );
}
