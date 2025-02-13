import DatabaseClient, {
  type Rows,
  type Result,
} from "../../../database/client";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  hashed_password: string;
  phone_number: string;
}

class userRepository {
  readAll = async () => {
    const [rows] = await DatabaseClient.query("select * from user");
    return rows;
  };

  readByEmail = async (email: string) => {
    const [rows] = await DatabaseClient.query<Rows>(
      "select email from user where email = ?",
      [email],
    );
    return rows[0];
  };

  create = async (user: User) => {
    const { first_name, last_name, email, hashed_password, phone_number } =
      user;

    const [result] = await DatabaseClient.query<Result>(
      "insert into user (first_name, last_name, email, password, phone_number) values (?, ?, ?, ?, ?)",
      [first_name, last_name, email, hashed_password, phone_number],
    );

    return result.insertId;
  };
}

export default new userRepository();
