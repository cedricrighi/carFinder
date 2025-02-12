import type { RequestHandler } from "express";
import categoryRepository from "./categoryRepository";

const getCatByName: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.query;

    if (typeof name !== "string") {
      throw new Error("Invalid category name");
    }
    const category = await categoryRepository.read(name);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export default { getCatByName };
