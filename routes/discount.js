/**
 * Restaurants CRUD routes
 * @author joshua lazar */
const router = require("express").Router();
const discount = require("../controllers/discount");
const { validateUpdate } = require("../middleware/validators/dicounts");
const { isValidated } = require("../middleware/validators/isValidated");

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post get discount menu
 * @method get get discount menu by id
 * @method put update discount menu
 * @method delete delete discount menu
 */

// post
router.post("/:restaurantId", validateUpdate, isValidated, discount.create); // create a new menu

// get;
router.get("/", discount.getDiscounts); // get all discount
router.get("/:restaurantId/get-by-restaurant", discount.getDiscounts); // get discount BY Restaurants

router.get("/:id", discount.getSingleDiscount); // get single get Single Discount menu
router.put("/:id", discount.updateDiscountslMenu); // get Update special menu
router.delete("/:id", discount.deleteDiscountslMenu); // get delete special menu

// Export
module.exports = router;
