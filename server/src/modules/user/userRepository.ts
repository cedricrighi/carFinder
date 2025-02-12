import DatabaseClient, { type Result } from "../../../database/client";

interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  birthday: string;
  phone_number: string;
}

class userRepository {
  readAll = async () => {
    const [rows] = await DatabaseClient.query("select * from user");
    return rows;
  };

  create = async (user: User) => {
    const {
      username,
      first_name,
      last_name,
      email,
      password,
      birthday,
      phone_number,
    } = user;

    const [result] = await DatabaseClient.query<Result>(
      "insert into user (username, first_name, last_name, email, password, birthday, phone_number) values (?, ?, ?, ?, ?, ?, ?)",
      [
        username,
        first_name,
        last_name,
        email,
        password,
        birthday,
        phone_number,
      ],
    );

    return result.insertId;
  };
}

export default new userRepository();
