/**
 * All api routes handles here
 * @author Yousuf Kalim
 */
const router = require("express").Router();

// Parent Routes
router.use("/admins", require("./admins")); // All the user routes
router.use("/managers", require("./managers")); // All the manager & auth routes
router.use("/users", require("./users")); // All the user routes
router.use("/restaurants", require("./restaurants")); // All the user routes
router.use("/categories", require("./categories")); // All the Category routes
router.use("/menus", require("./menus")); // All the menu routes
router.use("/specialmenus", require("./specialmenus")); // All the menu routes
router.use("/discounts", require("./discount")); // All the menu routes
router.use("/calendermenus", require("./calendermenus")); // All the menu routes
router.use("/calenderdiscounts", require("./calenderdiscounts")); // All the menu routes
router.use("/availabilities", require("./availability")); // All the menu routes
router.use("/unavailabilities", require("./unavailability"));
router.use("/emloyee", require("./emloyee"));
// Export
module.exports = router;
