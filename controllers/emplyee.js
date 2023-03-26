/**
 * Manager CRUD controllers
 * @author Yousuf Kalim
 */
const Managers = require("../models/Managers");
const Restaurants = require("../models/Restaurants");
const bcrypt = require("bcryptjs");
const bcryptSalt = process.env.BCRYPT_SALT || 10;
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/sendEmail");
const tokenSecret = process.env.JWT_SECRET;

/**
 * Create Manager - Signup
 * @param {object} req
 * @param {object} res
 */
exports.create = async (req, res) => {
  try {
    const { restaurantId } = req.params; // gettign restaurant id params

    let { name, phone, email, password, confirm_password, restaurant } =
      req.body; // Getting required fields from body
    // restaurant = JSON.parse(restaurant);
    const existingManager = await Managers.findOne({ email }); // Finding already existing manager

    // Extra Validations
    if (existingManager) {
      // If we found existing manager in db
      return res
        .status(409)
        .json({ success: false, message: "emplyee already exists." });
    }

    // Creating Manager
    req.body.password = bcrypt.hashSync(password, parseInt(bcryptSalt)); // Hashing the password with salt 8

    const manager = await Managers.create({
      ...req.body,
      restaurant: restaurantId,
      role: "employee",
    }); // Adding manager in db

    // Done
    res.json({ success: true, manager }); //Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Login
 * @param {object} req
 * @param {object} res
 */
//  exports.login = async (req, res) => {
//      try {
//          // Getting email and password
//          const { email, password } = req.body;

//          // Getting manager from db
//          const manager = await Managers.findOne({ email });

//          if (!manager) {
//              // If manager not found
//              console.log(manager);
//              return res.status(404).json({ success: false, message: "Manager not found" });
//          }

//          // Comparing password
//          const isMatched = bcrypt.compareSync(password, manager.password);

//          if (!isMatched) {
//              // If password not matched
//              return res.status(400).json({ success: false, message: "Invalid Password" });
//          }

//          // Creating payload with manager object
//          const payload = { manager };

//          // Generating token
//          jwt.sign(payload, tokenSecret, { expiresIn: 360000 }, (err, token) => {
//              if (err) throw err;

//              // done
//              res.json({ success: true, manager, token });
//          });
//      } catch (err) {
//          // Error handling
//          console.log("Error ----> ", err);
//          res.status(500).json({
//              success: false,
//              message: "Internal server error",
//          });
//      }
//  };

/**
 * Get manager by id
 * @param {object} req
 * @param {object} res
 */
exports.getById = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId; // Getting manager id from URL parameter
    const manager = await Managers.find({
      restaurant: req.params.restaurantId,
      role: "employee",
    }); // Finding manager by id
    res.json({ success: true, manager }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Confirm auth
 * @param {object} req
 * @param {object} res
 */
//  exports.confirmAuth = async (req, res) => {
//      // If manager authenticated
//      res.json({ success: true, manager: req.manager });
//  };

/**
 * Update manager
 * @param {object} req
 * @param {object} res
 */
//  exports.update = async (req, res) => {
//      try {
//          const managerId = req.params.managerId; // Getting manager id from URL parameter

//          const manager = await Managers.findByIdAndUpdate(managerId, req.body, {
//              new: true,
//          }); // Updating the manager
//          res.json({ success: true, manager }); // Success
//      } catch (err) {
//          // Error handling
//          console.log("Error ----> ", err);
//          res.status(500).json({
//              success: false,
//              message: "Internal server error",
//          });
//      }
//  };

/**
 * Change Password
 * @param {object} req
 * @param {object} res
 */
//  exports.changePassword = async (req, res) => {
//      try {
//          const { managerId } = req.params;
//          const { oldPassword, newPassword, confirmPassword } = req.body;

//          if (newPassword !== confirmPassword) {
//              return res.status(400).json({
//                  success: false,
//                  message: "New password and confirm password are not same",
//              });
//          }

//          let manager = await Managers.findById(managerId);

//          if (!manager) {
//              return res.status(404).json({ success: false, message: "Manager not found" });
//          }

//          const isMatched = bcrypt.compareSync(oldPassword, manager.password);

//          if (!isMatched) {
//              return res.status(400).json({ success: false, message: "Invalid old Password" });
//          }

//          // Generate token
//          manager.password = bcrypt.hashSync(newPassword, parseInt(bcryptSalt));

//          await manager.save();

//          res.json({ success: true, manager });
//      } catch (err) {
//          // Error handling
//          console.log("Error ----> ", err);
//          res.status(500).json({
//              success: false,
//              message: "Internal server error",
//          });
//      }
//  };

/**
 * Forgot password
 * @param {object} req
 * @param {object} res
 */
//  exports.forgot = async (req, res) => {
//      try {
//          let { email } = req.params;
//          let manager = await Managers.findOne({ email });

//          if (!manager) {
//              return res.status(404).json({ success: false, message: "Manager not found" });
//          }

//          // Generating random password
//          let randomPassword = Math.random().toString(36).slice(-8);

//          // Sending email to manager
//          sendEmail(email, randomPassword)
//              .then(async () => {
//                  // If email is sent then we have to update the password in db
//                  manager.password = await bcrypt.hash(randomPassword, parseInt(bcryptSalt));
//                  await manager.save();

//                  // Done
//                  res.json({ success: true, message: "Email sent successfully" });
//              })
//              .catch((err) => {
//                  // Error handling
//                  console.log("Error ----> ", err);
//                  res.status(500).json({
//                      success: false,
//                      message: "Internal server error",
//                  });
//              });
//      } catch (err) {
//          // Error handling
//          console.log("Error ----> ", err);
//          res.status(500).json({
//              success: false,
//              message: "Internal server error",
//          });
//      }
//  };

/**
 * Delete manager
 * @param {object} req
 * @param {object} res
 */
exports.delete = async (req, res) => {
  try {
    const managerId = req.params.managerId; // Getting manager id from URL parameter
    const manager = await Managers.findByIdAndDelete(managerId); // Deleting the manager
    res.json({ success: true, manager }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
