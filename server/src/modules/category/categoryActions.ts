import type { RequestHandler } from "express";
import categoryRepository from "./categoryRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const categories = await categoryRepository.readAll();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

const getCatByName: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.params;

    if (typeof name !== "string") {
      throw new Error("Invalid category name");
    }

    const category_id = await categoryRepository.read(name);

    res.status(200).json(category_id);
  } catch (error) {
    next(error);
  }
};

export default { browse, getCatByName };
