/**
 * CalenderDiscounts validation
 * @author Yousuf Kalim
 */
const { check } = require("express-validator");

/*
   ====================
   Validations
   ====================
   */

// CalenderDiscounts Create Validation
exports.validateCreate = [
  check("start_date")
    .notEmpty()
    .withMessage("Start Date is required.")
    .isDate()
    .withMessage("Start date is not valid."),
  check("end_date")
    .notEmpty()
    .withMessage("End Date is required.")
    .isDate()
    .withMessage("End date is not valid."),
  check("full_day").isBoolean().withMessage("Full day property is not valid"),
];

// CalenderDiscounts Update Validation
exports.validateUpdate = [
  check("start_date")
    .notEmpty()
    .withMessage("Start Date is required.")
    .isDate()
    .withMessage("Start date is not valid."),
  check("end_date")
    .notEmpty()
    .withMessage("End Date is required.")
    .isDate()
    .withMessage("End date is not valid."),
  check("full_day").isBoolean().withMessage("Full day property is not valid"),
];
