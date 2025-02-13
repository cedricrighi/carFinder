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
router.get("/api/", vehiclesActions.browseWithFilters);

router.get("/api/category", categoryActions.browse);
router.get("/api/category/:name", categoryActions.getCatByName);

router.post("/api/login", authActions.login);

router.post("/api/register", authActions.hashPassword, userActions.add);

router.get("/api/user/:email", userActions.browseByEmail);

router.get("/api/vehicles", vehiclesActions.browse);
router.post("/api/vehicle/:user_id", vehiclesActions.add);
router.get("/api/vehicles/search", vehiclesActions.browseWithFilters);
router.put("/api/vehicle/image", vehiclesActions.editImage);

/* ************************************************************************* */

export default router;
