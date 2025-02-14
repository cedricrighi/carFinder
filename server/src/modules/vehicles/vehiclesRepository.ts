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
  transmission: string;
  price: number;
}

class VehiclesRepository {
  readAll = async () => {
    const [rows] = await DatabaseClient.query<Rows>("select * from vehicle");
    return rows;
  };

  read = async (id: number) => {
    const [rows] = await DatabaseClient.query<Rows>(
      "select * from vehicle where id = ?",
      [id],
    );
    return rows[0];
  };

  readWithFilters = async (
    category_id: number | null,
    brand: string | null,
    year: number | null,
    transmission: string | null,
  ) => {
    let query = "SELECT * FROM vehicle WHERE 1=1";
    const params: (number | string)[] = [];

    if (category_id !== null && !Number.isNaN(category_id)) {
      query += " AND category_id = ?";
      params.push(category_id);
    }

    if (brand !== null && brand.trim() !== "") {
      query += " AND brand = ?";
      params.push(brand);
    }

    if (year !== null && !Number.isNaN(year)) {
      query += " AND year = ?";
      params.push(year);
    }

    if (transmission !== null && transmission.trim() !== "") {
      query += " AND transmission = ?";
      params.push(transmission);
    }

    query += " ORDER BY RAND()";

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

  readVehiclesByUser = async (user_id: number) => {
    const [rows] = await DatabaseClient.query<Rows>(
      "select * from vehicle where user_id = ?",
      [user_id],
    );
    return rows;
  };

  create = async (
    vehicle: Omit<VehiclesProps, "image">,
    category_id: number,
    user_id: number,
  ) => {
    const [result] = await DatabaseClient.query<Result>(
      "insert into vehicle (brand, model, year, mileage, consumption, transmission, price, category_id, user_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        vehicle.brand,
        vehicle.model,
        vehicle.year,
        vehicle.mileage,
        vehicle.consumption,
        vehicle.transmission,
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

  getLatestVehicles = async () => {
    const [rows] = await DatabaseClient.query<Rows>(
      "select * from vehicle order by add_date desc",
    );
    return rows;
  };

  deleteById = async (id: number) => {
    const [result] = await DatabaseClient.query<Result>(
      "delete from vehicle where id = ?",
      [id],
    );
    return result.affectedRows;
  };
}

export default new VehiclesRepository();
