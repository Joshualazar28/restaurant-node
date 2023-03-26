/**
 * Restaurants CRUD routes
 * @author joshua lazar */
const router = require("express").Router();
const avavailability = require("../controllers/avavailability");
const {
  validateCreate,
  validateUpdate,
} = require("../middleware/validators/managers");

const { isValidated } = require("../middleware/validators/isValidated");

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post get availability menu
 * @method get get availability menu by id
 * @method put update availability menu
 * @method delete delete availability menu
 */

// Create
router.put("/:restaurantId", avavailability.create);

// // post
// router.post(
//   "/:restaurantId",
//   validateUpdate,
//   isValidated,
//   unavailability.create
// ); // create a unavailability

// // //  // get;
// router.get("/", unavailability.getUnavailability); // get all discount
// router.get(
//   "/:restaurantId/get-by-restaurant",
//   unavailability.getUnavailability
// ); // get all discount

// router.get("/:id", unavailability.getUnavailabilitySingle); // get single get Single Discount menu
// router.put("/:id", unavailability.updateUnavailability); // get Update special menu
// router.delete("/:id", unavailability.deleteUnavailability); // get delete special menu

//  // Export
module.exports = router;
