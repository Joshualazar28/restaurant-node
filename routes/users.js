/**
 * User CRUD routes
 * @author Yousuf Kalim
 */
const router = require("express").Router();
const users = require("../controllers/users");
const { upload } = require("../middleware/multer");
const { checkUserAuth, checkAdminAuth } = require("../middleware/checkAuth");
const { validateUser, validateUserUpdate, validateLogin, changePasswordValidate } = require("../middleware/validators/users");
const { isValidated } = require("../middleware/validators/isValidated");

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post user signup
 * @method get get all users
 * @method get get user by id
 * @method put update user
 * @method delete delete user
 */

// Create - User Signup
router.post("/", upload.single("image"), validateUser, isValidated, users.create);
router.post("/login", validateLogin, isValidated, users.login); // Login User

// Read
router.get("/", checkAdminAuth, checkUserAuth, users.getAll); // Get all users at once
router.get("/auth", checkUserAuth, users.confirmAuth); // Check user auth
router.get("/:userId", checkUserAuth, users.getById); // Get one user by it's id

// Update
router.put("/password/:userId", checkUserAuth, changePasswordValidate, isValidated, users.changePassword); // Change password route
router.put("/forgot/:email", users.forgot); // forgot password
router.put("/:userId", checkUserAuth, validateUserUpdate, isValidated, users.update); // Update a specific user by it's id

// Delete
router.delete("/:userId", checkUserAuth, users.delete); // delete a specific user by it's id

// Export
module.exports = router;
