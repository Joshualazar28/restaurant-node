/**
 * User CRUD controllers
 * @author Yousuf Kalim
 */
const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const bcryptSalt = process.env.BCRYPT_SALT || 10;
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/sendEmail");
const tokenSecret = process.env.JWT_SECRET;

/**
 * Create User - Signup
 * @param {object} req
 * @param {object} res
 */
exports.create = async (req, res) => {
	try {
		let { email, password } = req.body; // Getting required fields from body
		const existingUser = await Users.findOne({ email }); // Finding already existing user

		// Extra Validations
		if (existingUser) {
			// If we found existing user in db
			return res.status(409).json({ success: false, message: "User already exists." });
		}

		// Getting url of the image
		if (req.file) {
			req.body.photo = req.file.path; // Creating a new property called photo in body object
		}

		// Creating User
		req.body.password = bcrypt.hashSync(password, parseInt(bcryptSalt)); // Hashing the password with salt 8
		const user = await Users.create(req.body); // Adding user in db

		// Done
		res.json({ success: true, user }); //Success
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
exports.login = async (req, res) => {
	try {
		// Getting email and password
		const { email, password } = req.body;

		// Getting user from db
		const user = await Users.findOne({ email });

		if (!user) {
			// If user not found
			console.log(user);
			return res.status(404).json({ success: false, message: "User not found" });
		}

		// Comparing password
		const isMatched = bcrypt.compareSync(password, user.password);

		if (!isMatched) {
			// If password not matched
			return res.status(400).json({ success: false, message: "Invalid Password" });
		}

		// Creating payload with user object
		const payload = { user };

		// Generating token
		jwt.sign(payload, tokenSecret, { expiresIn: 360000 }, (err, token) => {
			if (err) throw err;

			// done
			res.json({ success: true, user, token });
		});
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
 * Get all users
 * @param {object} req
 * @param {object} res
 */
exports.getAll = async (req, res) => {
	try {
		const users = await Users.find(); // Finding all the users from db
		res.json({ success: true, users }); // Success
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
 * Get user by id
 * @param {object} req
 * @param {object} res
 */
exports.getById = async (req, res) => {
	try {
		const userId = req.params.userId; // Getting user id from URL parameter
		const user = await Users.findById(userId); // Finding user by id
		res.json({ success: true, user }); // Success
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
exports.confirmAuth = async (req, res) => {
	// If user authenticated
	res.json({ success: true, user: req.user });
};

/**
 * Update user
 * @param {object} req
 * @param {object} res
 */
exports.update = async (req, res) => {
	try {
		const userId = req.params.userId; // Getting user id from URL parameter

		// If user want to update it's password
		if (req.body.password) {
			req.body.password = bcrypt.hashSync(req.body.password, parseInt(bcryptSalt));
		}

		const user = await Users.findByIdAndUpdate(userId, req.body, {
			new: true,
		}); // Updating the user
		res.json({ success: true, user }); // Success
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
 * Change Password
 * @param {object} req
 * @param {object} res
 */
exports.changePassword = async (req, res) => {
	try {
		const { userId } = req.params;
		const { oldPassword, newPassword, confirmPassword } = req.body;

		if (newPassword !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message: "New password and confirm password are not same",
			});
		}

		let user = await Users.findById(userId);

		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		const isMatched = bcrypt.compareSync(oldPassword, user.password);

		if (!isMatched) {
			return res.status(400).json({ success: false, message: "Invalid old Password" });
		}

		// Generate token
		user.password = bcrypt.hashSync(newPassword, parseInt(bcryptSalt));

		await user.save();

		res.json({ success: true, user });
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
 * Forgot password
 * @param {object} req
 * @param {object} res
 */
exports.forgot = async (req, res) => {
	try {
		let { email } = req.params;
		let user = await Users.findOne({ email });

		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		// Generating random password
		let randomPassword = Math.random().toString(36).slice(-8);

		// Sending email to user
		sendEmail(email, randomPassword)
			.then(async () => {
				// If email is sent then we have to update the password in db
				user.password = await bcrypt.hash(randomPassword, parseInt(bcryptSalt));
				await user.save();

				// Done
				res.json({ success: true, message: "Email sent successfully" });
			})
			.catch((err) => {
				// Error handling
				console.log("Error ----> ", err);
				res.status(500).json({
					success: false,
					message: "Internal server error",
				});
			});
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
 * Delete user
 * @param {object} req
 * @param {object} res
 */
exports.delete = async (req, res) => {
	try {
		const userId = req.params.userId; // Getting user id from URL parameter
		const user = await Users.findByIdAndDelete(userId); // Deleting the user
		res.json({ success: true, user }); // Success
	} catch (err) {
		// Error handling
		console.log("Error ----> ", err);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};
