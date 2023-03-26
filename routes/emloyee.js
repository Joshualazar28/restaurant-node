/**
 * Manager CRUD routes
 * @author Yousuf Kalim
 */
const router = require("express").Router();
const employee = require("../controllers/emplyee");
const { checkManagerAuth } = require("../middleware/checkAuth");
const {
  validateCreate,
  validateUpdate,
  validateLogin,
  validatePasswordUpdate,
} = require("../middleware/validators/managers");
const { isValidated } = require("../middleware/validators/isValidated");

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post manager signup
 * @method get get all managers
 * @method get get manager by id
 * @method put update manager
 * @method delete delete manager
 */

// Create
router.post("/:restaurantId", employee.create);

router.get("/:restaurantId", employee.getById); // Get one manager by it's id

// Export
module.exports = router;
