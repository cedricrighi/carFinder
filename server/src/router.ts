import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import categoryActions from "./modules/category/categoryActions";
// Define item-related routes
import itemActions from "./modules/item/itemActions";
import vehiclesActions from "./modules/vehicles/vehiclesActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.get("/api/filters/years", vehiclesActions.getYearsInDatabase);
router.get("/api/", vehiclesActions.browseWithFilters);

router.get("/api/category", categoryActions.browse);
router.get("/api/category/:name", categoryActions.getCatByName);

router.get("/api/vehicles", vehiclesActions.browse);
router.post("/api/vehicle/:user_id", vehiclesActions.add);
router.get("/api/vehicles/search", vehiclesActions.browseWithFilters);

/* ************************************************************************* */

export default router;
