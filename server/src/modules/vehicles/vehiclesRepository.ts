import DatabaseClient, {
  type Result,
  type Rows,
} from "../../../database/client";

interface VehiclesProps {
  image: string;
  brand: number;
  model: string;
  year: number;
  mileage: number;
  consumption: number;
  price: number;
}

class VehiclesRepository {
  readAll = async () => {
    const [rows] = await DatabaseClient.query<Rows>("select * from vehicle");
    return rows;
  };

  readWithFilters = async (
    category_id: number | undefined,
    brand: string | undefined,
    year: number | undefined,
    transmission: string | undefined,
  ) => {
    let query = "SELECT * FROM vehicle WHERE 1=1";
    const params: (number | string)[] = [];

    if (category_id !== undefined && !Number.isNaN(category_id)) {
      query += " AND category_id = ?";
      params.push(category_id);
    }

    if (brand !== undefined) {
      query += " AND brand = ?";
      params.push(brand);
    }

    if (year !== undefined && !Number.isNaN(year)) {
      query += " AND year = ?";
      params.push(year);
    }

    if (transmission !== undefined) {
      query += " AND transmission = ?";
      params.push(transmission);
    }

    const [rows] = await DatabaseClient.query<Rows>(query, params);
    return rows;
  };

  readYearsInDatabase = async () => {
    const [rows] = await DatabaseClient.query<Rows>(
      "select distinct year from vehicle",
    );
    return rows;
  };

  readBrandsInDatabase = async () => {
    const [rows] = await DatabaseClient.query<Rows>(
      "select distinct brand from vehicle",
    );
    return rows;
  };

  create = async (
    vehicle: Omit<VehiclesProps, "image">,
    category_id: number,
    user_id: number,
  ) => {
    const [result] = await DatabaseClient.query<Result>(
      "insert into vehicle (brand, model, year, mileage, consumption, price, category_id, user_id) values (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        vehicle.brand,
        vehicle.model,
        vehicle.year,
        vehicle.mileage,
        vehicle.consumption,
        vehicle.price,
        category_id,
        user_id,
      ],
    );
    return result.insertId;
  };

  updateImageVehicles = async (id: number, image: string) => {
    const [result] = await DatabaseClient.query<Result>(
      "update vehicle set image = ? where id = ?",
      [image, id],
    );
    return result.affectedRows;
  };
}

export default new VehiclesRepository();
