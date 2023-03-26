/**
 * Restaurants CRUD routes
 * @author joshua lazar */
const router = require("express").Router();
const menus = require("../controllers/menus");
const { validateUpdate } = require("../middleware/validators/menus");
const { isValidated } = require("../middleware/validators/isValidated");

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post get Menus
 * @method get get Menus by id
 * @method put update Menus
 * @method delete delete Menus
 */

router.post("/:restaurantId", validateUpdate, isValidated, menus.create); // create a new menu

router.get("/", menus.getMenus); // get all Menu
router.get("/:restaurantId/get-by-restaurant", menus.getMenus); // get  Menu for Restaurant

router.get("/:id", menus.getMenu); // get single menu
router.put("/:id", menus.updateMenu); // get update menu
router.delete("/:id", menus.deleteMenu); // get delete menu

// Export
module.exports = router;
