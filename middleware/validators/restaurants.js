/**
 * Restaurants validation
 * @author Yousuf Kalim
 */
const { check } = require("express-validator");

/*
  ====================
  Validations
  ====================
  */

// Signup Validation
exports.validateCreate = [
  check("name", "Name is required.").notEmpty().trim(),
  check("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email is not valid.")
    .trim()
    .toLowerCase(),
  check("zipcode")
    .notEmpty()
    .withMessage("Zipcode is required.")
    .isPostalCode()
    .withMessage("Zipcode is not valid"),
  check("city").notEmpty().withMessage("City is required.").trim(),
  check("country").notEmpty().withMessage("Country is required.").trim(),
];

// Update Validation
exports.validateUpdate = [
  check("name", "Name is required.").notEmpty().trim(),
  check("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email is not valid.")
    .trim()
    .toLowerCase(),
  check("zipcode")
    .notEmpty()
    .withMessage("Zipcode is required.")
    .isNumeric()
    .withMessage("Zipcode is not valid"),
  check("city").notEmpty().withMessage("City is required.").trim(),
  check("country").notEmpty().withMessage("Country is required.").trim(),
];
