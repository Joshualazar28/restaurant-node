/**
 * All the validation
 * @author Yousuf Kalim
 */
const { check } = require("express-validator");

/*
====================
Validations
====================
*/

// You can create multiple validations strategies (Read express-validator documentation for more details)
// User Signup Validation
exports.validateUser = [
	check("name", "Name is required.").notEmpty().trim(),
	check("email", "Email is required.").notEmpty().isEmail().trim(),
	check("password", "Password is required.").notEmpty().trim().isLength({ min: 8 }),
	check("number", "Number is required.").notEmpty().isNumeric().trim(),
	check("gender").trim(),
	check("role").trim(),
	check("address").trim(),
	check("city").trim(),
	check("country").trim(),
];

// User Signup Validation
exports.validateUserUpdate = [
	check("name", "Name is required.").notEmpty().trim(),
	check("email", "Email is required.").notEmpty().isEmail().trim(),
	check("number", "Number is required.").notEmpty().isNumeric().trim(),
	check("gender").trim(),
	check("role").trim(),
	check("address").trim(),
	check("city").trim(),
	check("country").trim(),
];

// Login validation
exports.validateLogin = [
	check("email", "Email is required").notEmpty().isEmail().trim().toLowerCase(),
	check("password", "Password is required.").notEmpty().trim().isLength({ min: 8 }),
];

// Change password validation
exports.changePasswordValidate = [
	check("oldPassword", "Old Password is required.").notEmpty().trim().isLength({ min: 8 }),
	check("newPassword", "New password is required.").notEmpty().trim().isLength({ min: 8 }),
	check("confirmPassword", "Confirm password is required.").notEmpty().trim().isLength({ min: 8 }),
];
