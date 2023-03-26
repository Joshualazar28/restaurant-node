/**
 * Restaurants CRUD routes
 * @author Yousuf Kalim
 */
const express = require("express");

const categoriesRouter = require("./categories");
const router = express.Router();
const restaurants = require("../controllers/restaurants");
const { validateUpdate } = require("../middleware/validators/restaurants");
const { isValidated } = require("../middleware/validators/isValidated");

/**
 * ////////////////////////// Routes /////////////////////////
 * @method get get restaurant by id
 * @method put update restaurant
 * @method delete delete restaurant
 */

// Re-route into other resousre routers

// router.use("/:restaurantId/categories", categoriesRouter);

// Read
router.get("/:restaurantId", restaurants.getById); // Check restaurant auth

// Update
router.put("/:restaurantId", validateUpdate, isValidated, restaurants.update); // Update a specific restaurant by it's id

// Export
module.exports = router;
