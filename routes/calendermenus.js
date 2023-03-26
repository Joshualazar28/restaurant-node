/**
 * Restaurants CRUD routes
 * @author joshua lazar */
const router = require("express").Router();
const calendermenus = require("../controllers/calendermenus");
const { validateUpdate } = require("../middleware/validators/calenderMenus");
const { isValidated } = require("../middleware/validators/isValidated");

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post get calendermenus menu
 * @method get get calendermenus menu by id
 * @method put update calendermenus menu
 * @method delete delete calendermenus menu
 */

// post
router.post(
  "/:restaurantId",
  validateUpdate,
  isValidated,
  calendermenus.create
); // create a new menu

// get;
router.get("/", calendermenus.getCalenderMenus); // get all discount
router.get("/:restaurantId/get-by-restaurant", calendermenus.getCalenderMenus); // get all discount

router.get("/:id", calendermenus.getCalenderMenusSingle); // get single get Single Discount menu

router.put("/:id", calendermenus.updateCalenderMenus); // get Update special menu
router.delete("/:id", calendermenus.deleteCalenderMenu); // get delete special menu

// Export
module.exports = router;
