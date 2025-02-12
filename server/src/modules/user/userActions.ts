import { ne } from "@faker-js/faker/.";
import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const add: RequestHandler = async (req, res, next) => {
  const {
    username,
    first_name,
    last_name,
    email,
    password,
    birthday,
    phone_number,
  } = req.body;
  const user = {
    username,
    first_name,
    last_name,
    email,
    password,
    birthday,
    phone_number,
  };

  try {
    const id = await userRepository.create(user);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
