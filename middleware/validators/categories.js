/**
 * Categories validation
 * @author Yousuf Kalim
 */
const { check } = require("express-validator");

/*
	====================
	Validations
	====================
	*/

// Categories Create Validation
exports.validateCreate = [
	check("name", "Name is required.").notEmpty().trim(),
	check("active").isBoolean().withMessage("Active property is not valid."),
];

// Categories Update Validation
exports.validateUpdate = [
	check("name", "Name is required.").notEmpty().trim(),
	check("active").isBoolean().withMessage("Active property is not valid."),
];
