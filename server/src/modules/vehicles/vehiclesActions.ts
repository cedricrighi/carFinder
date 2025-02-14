import { v2 as cloudinary } from "cloudinary";
import type { Request, RequestHandler } from "express";
import type { UploadedFile } from "express-fileupload";
import vehiclesRepository from "./vehiclesRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const vehicles = await vehiclesRepository.readAll();
    res.status(200).json(vehicles);
  } catch (error) {
    next(error);
  }
};

const browseWithFilters: RequestHandler = async (req, res, next) => {
  try {
    const { category_id, brand, year, transmission } = req.query;

    // Convertir les paramètres en gérant les cas undefined/vides
    const parsedCategoryId = category_id
      ? Number.parseInt(category_id as string)
      : null;
    const parsedYear = year ? Number.parseInt(year as string) : null;

    const vehicles = await vehiclesRepository.readWithFilters(
      parsedCategoryId,
      (brand as string) || null,
      parsedYear,
      (transmission as string) || null,
    );
    res.status(200).json(vehicles);
  } catch (error) {
    next(error);
  }
};

const getYearsInDatabase: RequestHandler = async (req, res, next) => {
  try {
    const years = await vehiclesRepository.readYearsInDatabase();
    res.status(200).json(years);
  } catch (error) {
    next(error);
  }
};

const getBrandsInDatabase: RequestHandler = async (req, res, next) => {
  try {
    const brands = await vehiclesRepository.readBrandsInDatabase();
    res.status(200).json(brands);
  } catch (error) {
    next(error);
  }
};

const getLatest: RequestHandler = async (_, res, next) => {
  try {
    const vehicles = await vehiclesRepository.getLatestVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    next(error);
  }
};

const getByUser: RequestHandler = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const vehicles = await vehiclesRepository.readVehiclesByUser(
      Number.parseInt(user_id),
    );

    res.status(200).json(vehicles);
  } catch (error) {
    next(error);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const vehicle = await vehiclesRepository.read(Number.parseInt(id));
    res.status(200).json(vehicle);
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const editImage: RequestHandler = async (req, res, next) => {
  try {
    const vehicle_id = req.query.vehicle_id as string;

    const file = Array.isArray(req.files?.photo)
      ? req.files.photo[0]
      : (req.files?.photo as UploadedFile | undefined);

    if (!file) {
      res.status(400).json({ error: "Pas de fichier à traiter" });
      return;
    }

    cloudinary.uploader
      .upload_stream(
        {
          folder: "vehicles-photo",
        },
        async (error, result) => {
          if (error) {
            console.error(error);
            return res.status(500).json({
              error: "Something went wrong while uploading the photo",
            });
          }

          if (result) {
            try {
              const updateResult = await vehiclesRepository.updateImageVehicles(
                Number.parseInt(vehicle_id),
                result.secure_url,
              );
              return res.status(200).json(updateResult);
            } catch (dbError) {
              console.error(dbError);
              return res.status(500).json({ error: "Database update failed" });
            }
          }
        },
      )
      .end(file.data);
  } catch (error) {
    next(error);
  }
};

const deleteById: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    await vehiclesRepository.deleteById(Number.parseInt(id));
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export default {
  browse,
  getYearsInDatabase,
  getBrandsInDatabase,
  getByUser,
  getLatest,
  browseWithFilters,
  read,
  add,
  editImage,
  deleteById,
};
