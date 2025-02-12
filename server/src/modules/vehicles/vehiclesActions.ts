import { v2 as cloudinary } from "cloudinary";
import type { RequestHandler } from "express";
import vehiclesRepository from "./vehiclesRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const vehicles = await vehiclesRepository.readAll();
    res.status(200).json(vehicles);
  } catch (error) {
    next(error);
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const add: RequestHandler = async (req, res, next) => {
  try {
    const image = "test";
    const user_id = req.params.user_id;

    const {
      brand,
      model,
      year,
      mileage,
      consumption,
      transmission,
      price,
      category_id,
    } = req.body;
    const vehicle = {
      image,
      brand,
      model,
      year,
      mileage,
      consumption,
      transmission,
      price,
    };
    const id = await vehiclesRepository.create(
      vehicle,
      category_id,
      Number.parseInt(user_id),
    );
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export default { browse, add };
