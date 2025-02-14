import type { Rows } from "../../../database/client";
import DatabaseClient from "../../../database/client";

class categoryRepository {
  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>("select * from category");
    return rows;
  }

  async read(name: string) {
    const [rows] = await DatabaseClient.query<Rows>(
      "select * from category where name = ?",
      [name],
    );
    return rows;
  }

  async readById(id: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "select name from category where id = ?",
      [id],
    );
    return rows;
  }
}

export default new categoryRepository();
