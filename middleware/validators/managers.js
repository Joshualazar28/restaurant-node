/**
 * Manager validation
 * @author Yousuf Kalim
 */
const { check } = require("express-validator");

/*
 ====================
 Validations
 ====================
 */

// Manager Signup Validation
exports.validateCreate = [
	check("name", "Name is required.").notEmpty().trim(),
	check("phone").notEmpty().withMessage("Phone is required.").isMobilePhone().withMessage("Phone number is not valid.").trim(),
	check("email").notEmpty().withMessage("Email is required.").isEmail().withMessage("Email is not valid.").trim().toLowerCase(),
	check("password")
		.notEmpty()
		.withMessage("Password is required.")
		.trim()
		.isLength({ min: 8 })
		.withMessage("Password should be min 8 characters long."),
	check("confirm_password")
		.notEmpty()
		.withMessage("Confirm Password is required.")
		.trim()
		.isLength({ min: 8 })
		.withMessage("Confirm Password should be min 8 characters long."),
	check("restaurant.name", "Restaurant name is required.").notEmpty().trim(),
	check("restaurant.email")
		.notEmpty()
		.withMessage("Restaurant email is required.")
		.isEmail()
		.withMessage("Restaurant email is not valid.")
		.trim()
		.toLowerCase(),
	check("restaurant.zipcode")
		.notEmpty()
		.withMessage("Restaurant zipcode is required.")
		.isNumeric()
		.withMessage("Restaurant zipcode is not valid"),
	check("restaurant.city").notEmpty().withMessage("Restaurant city is required.").trim(),
	check("restaurant.country").notEmpty().withMessage("Restaurant country is required.").trim(),
];

// Manager Update Validation
exports.validateUpdate = [
	check("name", "Name is required.").notEmpty().trim(),
	check("phone").notEmpty().withMessage("Phone is required.").isMobilePhone().withMessage("Phone number is not valid.").trim(),
	check("email").notEmpty().withMessage("Email is required.").isEmail().withMessage("Email is not valid.").trim().toLowerCase(),
];

// Login validation
exports.validateLogin = [
	check("email", "Email is required").notEmpty().isEmail().trim().toLowerCase(),
	check("password", "Password is required.").notEmpty().trim().isLength({ min: 8 }),
];

// Change password validation
exports.validatePasswordUpdate = [
	check("oldPassword", "Old Password is required.").notEmpty().trim().isLength({ min: 8 }),
	check("newPassword", "New password is required.").notEmpty().trim().isLength({ min: 8 }),
	check("confirmPassword", "Confirm password is required.").notEmpty().trim().isLength({ min: 8 }),
];
