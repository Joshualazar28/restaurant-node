/**
 * Restaurants CRUD routes
 * @author joshua lazar */
const router = require("express").Router();
const calenderdiscounts = require("../controllers/calenderdiscounts");
const {
  validateUpdate,
} = require("../middleware/validators/calenderDiscounts");
const { isValidated } = require("../middleware/validators/isValidated");

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post get calenderdiscounts menu
 * @method get get calenderdiscounts menu by id
 * @method put update calenderdiscounts menu
 * @method delete delete calenderdiscounts menu
 */

// post
router.post(
  "/:restaurantId",
  validateUpdate,
  isValidated,
  calenderdiscounts.create
); // create a calenderdiscounts

// get;
router.get("/", calenderdiscounts.getCalenderDiscount); // get all discount
router.get(
  "/:restaurantId/get-by-restaurant",
  calenderdiscounts.getCalenderDiscount
); // get all discount

router.get("/:id", calenderdiscounts.getCalenderDiscounSingle); // get single get Single Discount menu
router.put("/:id", calenderdiscounts.updateCalenderDiscoun); // get Update special menu
router.delete("/:id", calenderdiscounts.deleteCalenderDiscounts); // get delete special menu

// Export
module.exports = router;
