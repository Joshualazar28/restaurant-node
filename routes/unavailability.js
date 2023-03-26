/**
 * Restaurants CRUD routes
 * @author joshua lazar */
const router = require("express").Router();
const unavailability = require("../controllers/unavailability");
const { validateUpdate } = require("../middleware/validators/unavailability");
const { isValidated } = require("../middleware/validators/isValidated");

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post get unavailability menu
 * @method get get unavailability menu by id
 * @method put update unavailability menu
 * @method delete delete unavailability menu
 */

// post
router.post(
  "/:restaurantId",
  validateUpdate,
  isValidated,
  unavailability.create
); // create a unavailability

// //  // get;
router.get("/", unavailability.getUnavailability); // get all discount
router.get(
  "/:restaurantId/get-by-restaurant",
  unavailability.getUnavailability
); // get all discount

router.get("/:id", unavailability.getUnavailabilitySingle); // get single get Single Discount menu
router.put("/:id", unavailability.updateUnavailability); // get Update special menu
router.delete("/:id", unavailability.deleteUnavailability); // get delete special menu

//  // Export
module.exports = router;
