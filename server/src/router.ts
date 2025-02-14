import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import authActions from "./modules/auth/authActions";
import categoryActions from "./modules/category/categoryActions";
// Define item-related routes
import itemActions from "./modules/item/itemActions";
import userActions from "./modules/user/userActions";
import vehiclesActions from "./modules/vehicles/vehiclesActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.get("/api/brands", vehiclesActions.getBrandsInDatabase);
router.get("/api/filters/years", vehiclesActions.getYearsInDatabase);

router.get("/api/category", categoryActions.browse);
router.get("/api/category/:id", categoryActions.getCatById);
router.get("/api/category/:name", categoryActions.getCatByName);

router.post("/api/login", authActions.login);

router.post("/api/register", authActions.hashPassword, userActions.add);

router.get("/api/user/:email", userActions.browseByEmail);
router.get("/api/user-id/:id", userActions.browseById);

router.get("/api/vehicle/:id", vehiclesActions.read);
router.get("/api/vehicles/:user_id", vehiclesActions.getByUser);
router.post("/api/add-vehicle/:user_id", vehiclesActions.add);
router.put("/api/vehicle/image", vehiclesActions.editImage);
router.get("/api/vehicles", vehiclesActions.browse);
router.get("/api/search-vehicles", vehiclesActions.browseWithFilters);
router.get("/api/latest-vehicles", vehiclesActions.getLatest);
router.delete("/api/vehicle/:id", vehiclesActions.deleteById);

/* ************************************************************************* */

export default router;
