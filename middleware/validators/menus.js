/**
 * menus validation
 * @author Yousuf Kalim
 */
const { check } = require("express-validator");

/*
	  ====================
	  Validations
	  ====================
 */

// menus Create Validation
exports.validateCreate = [
	check("name", "Name is required.").notEmpty().trim(),
	check("price").notEmpty().withMessage("Price is required.").isNumeric().withMessage("Price is not valid."),
	check("active").isBoolean().withMessage("active property is not valid."),
];

// menus Update Validation
exports.validateUpdate = [
	check("name", "Name is required.").notEmpty().trim(),
	check("price").notEmpty().withMessage("Price is required.").isNumeric().withMessage("Price is not valid."),
	check("active").isBoolean().withMessage("active property is not valid."),
];
