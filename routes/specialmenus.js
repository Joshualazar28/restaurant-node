/**
 * Restaurants CRUD routes
 * @author joshua lazar */ //
const router = require("express").Router();
const specialmenu = require("../controllers/specialmenu");
const { validateUpdate } = require("../middleware/validators/specialMenus");
const { isValidated } = require("../middleware/validators/isValidated");

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post get special menu
 * @method get get special menu by id
 * @method put update special menu
 * @method delete delete special menu
 */

// post
router.post("/:restaurantId", validateUpdate, isValidated, specialmenu.create); // create a new  Specail Menus

// get;
router.get("/", specialmenu.getSpecialMenu); // Get All special  Menu
router.get("/:restaurantId/get-by-restaurant", specialmenu.getSpecialMenu); // get Specail Menus by Restaurant

router.get("/:id", specialmenu.getSingleSpecaiMenu); // get single  Specail Menus
router.put("/:id", specialmenu.updateSpecailMenu); // get Update  Specail Menus
router.delete("/:id", specialmenu.deleteSpecailMenu); // get delete  Specail Menus

// Export
module.exports = router;
