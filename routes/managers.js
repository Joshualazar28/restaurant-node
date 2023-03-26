/**
 * Manager CRUD routes
 * @author Yousuf Kalim
 */
const router = require("express").Router();
const managers = require("../controllers/managers");
const { checkManagerAuth } = require("../middleware/checkAuth");
const { validateCreate, validateUpdate, validateLogin, validatePasswordUpdate } = require("../middleware/validators/managers");
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
router.post("/", validateCreate, isValidated, managers.create);
router.post("/login", validateLogin, isValidated, managers.login); // Manager login

// Read
router.get("/auth", checkManagerAuth, managers.confirmAuth); // Check manager auth
router.get("/:managerId", checkManagerAuth, managers.getById); // Get one manager by it's id

// Update
router.put("/password/:managerId", checkManagerAuth, validatePasswordUpdate, isValidated, managers.changePassword); // Change password route
router.put("/forgot/:email", managers.forgot);
router.put("/:managerId", checkManagerAuth, validateUpdate, isValidated, managers.update); // Update a specific manager by it's id

// Delete
router.delete("/:managerId", checkManagerAuth, managers.delete); // delete a specific manager by it's id

// Export
module.exports = router;
