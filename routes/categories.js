/**
 * Restaurants CRUD routes
 * @author joshua lazar */

const router = require("express").Router({ mergeParams: true });
const category = require("../controllers/category");
const { validateUpdate } = require("../middleware/validators/categories");
const { isValidated } = require("../middleware/validators/isValidated");

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post get category
 * @method get get category by id
 * @method put update category
 * @method delete delete category
 */

// post

router.post("/:restaurantId", validateUpdate, isValidated, category.create); // create a new Categories

// get
// router.route("/").get(category.getCategories); // get all categories
// router.route("/:restaurantId").get(category.getCategories); // get all categories
router.get("/", category.getCategories);
router.get("/:restaurantId/catrgories", category.getCategories); // get Categories by restaurant iD
router.get("/:id", category.getSingleCategory); // get single category
router.put("/:id", category.updateCategories); // put the category
router.delete("/:id", category.deleteCategory); // delete the category

// Export
module.exports = router;
