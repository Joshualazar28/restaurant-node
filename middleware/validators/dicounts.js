/**
 * discounts validation
 * @author Yousuf Kalim
 */
const { check } = require("express-validator");

/*
	 ====================
	 Validations
	 ====================
*/

// discounts Create Validation
exports.validateCreate = [
	check("name", "Name is required.").notEmpty().trim(),
	check("discount").isNumeric().withMessage("Discount is not valid.").trim(),
];

// discounts Update Validation
exports.validateUpdate = [
	check("name", "Name is required.").notEmpty().trim(),
	check("discount").isNumeric().withMessage("Discount is not valid.").trim(),
];
