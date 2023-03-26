/**
 * unavailability validation
 * @author Yousuf Kalim
 */
const { check } = require("express-validator");

/*
	  ====================
	  Validations
	  ====================
 */

// unavailability Create Validation
exports.validateCreate = [
  check("date")
    .notEmpty()
    .withMessage("Date is required.")
    .isDate()
    .withMessage("Date is not valid."),
  check("day_off").isBoolean().withMessage("Day off property is not valid."),
];

// unavailability Update Validation
exports.validateUpdate = [
  check("date")
    .notEmpty()
    .withMessage("Date is required.")
    .isDate()
    .withMessage("Date is not valid."),
  check("day_off").isBoolean().withMessage("Day off property is not valid."),
];
