import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const browseByEmail: RequestHandler = async (req, res, next) => {
  const { email } = req.params;

  try {
    const user = await userRepository.readEmailByEmail(email);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const browseById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await userRepository.readById(Number.parseInt(id));

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  const { image, first_name, last_name, email, hashed_password, phone_number } =
    req.body;

  const user = {
    first_name,
    last_name,
    email,
    hashed_password,
    phone_number,
  };

  try {
    const id = await userRepository.create(user);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export default { browseByEmail, browseById, add };
