const router = require("express").Router();
const { register, login, confirmAuth } = require("../controllers/admins");
const { checkAdminAuth } = require("../middleware/checkAuth");

// Admin Register
router.post("/", register);
router.post("/login", login);
router.get("/auth", checkAdminAuth, confirmAuth);

module.exports = router;
