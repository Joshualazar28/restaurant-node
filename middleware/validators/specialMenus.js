/**
 * specialMenus validation
 * @author Yousuf Kalim
 */
const { check } = require("express-validator");

/*
	   ====================
	   Validations
	   ====================
  */

// specialMenus Create Validation
exports.validateCreate = [
	check("name", "Name is required.").notEmpty().trim(),
	check("price").notEmpty().withMessage("Price is required.").isNumeric().withMessage("Price is not valid."),
	check("min_persons")
		.notEmpty()
		.withMessage("Min persons are required.")
		.isNumeric()
		.withMessage("Min persons are not valid."),
	check("max_persons")
		.notEmpty()
		.withMessage("Max persons are required.")
		.isNumeric()
		.withMessage("Max persons are not valid."),
];

// specialMenus Update Validation
exports.validateUpdate = [
	check("name", "Name is required.").notEmpty().trim(),
	check("price").notEmpty().withMessage("Price is required.").isNumeric().withMessage("Price is not valid."),
	check("min_persons")
		.notEmpty()
		.withMessage("Min persons are required.")
		.isNumeric()
		.withMessage("Min persons are not valid."),
	check("max_persons")
		.notEmpty()
		.withMessage("Max persons are required.")
		.isNumeric()
		.withMessage("Max persons are not valid."),
];
