const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

const {
	isEmpty,
	isAlpha,
	isAlphanumeric,
	isEmail,
	isStrongPassword,
} = require("validator");

const User = require("../model/User");


async function createUser(req, res) {
	const { firstName, lastName, username, email, password } = req.body;
	let body = req.body;
	let errObj = {};

	for (let key in body) {
		if (isEmpty(body[key])) {
			errObj[`${key}`] = `${key} cannot be empty`;
		}
	}

	if (!isAlpha(firstName)) {
		errObj.firstName =
			"First Name cannot have special characters or numbers";
	}

	if (!isAlpha(lastName)) {
		errObj.lastName = "Last Name cannot have special characters or numbers";
	}

	if (!isAlphanumeric(username)) {
		errObj.username = "Username cannot have special characters";
	}

	if (!isEmail(email)) {
		errObj.email = "please enter a valid email";
	}

	if (!isStrongPassword(password)) {
		errObj.password =
			"Your password must contain 1 lowercase, 1 uppercase, 1 number, 1 special character and at least 8 characters long";
	}

	if (Object.keys(errObj).length > 0) {
		//How would you validate firstName to make sure only alphabet is allowed
		return res.status(500).json({
			message: "error",
			error: errObj,
		});
	}

	try {
		let salt = await bcrypt.genSalt(10);
		let hashedPassword = await bcrypt.hash(password, salt);

		const createdUser = new User({
			firstName,
			lastName,
			username,
			email,
			password: hashedPassword,
		});

		let savedUser = await createdUser.save();

		res.json({ message: "success", payload: savedUser });
	} catch (error) {
		res.status(500).json({ message: "error", error: error.message });
	}
}

async function login(req, res) {
	const { email, password } = req.body;

	let errObj = {};

	if (isEmpty(password)) {
		errObj.password = "password cannot be empty";
	}

	if (isEmpty(email)) {
		errObj.email = "email cannot be empty";
	}

	if (!isEmail(email)) {
		errObj.email = "please enter a valid email";
	}

	if (Object.keys(errObj).length > 0) {
		return res.status(500).json({
			message: "error",
			error: errObj,
		});
	}

	try {
		let foundUser = await User.findOne({ email: email });
		if (!foundUser) {
			return res.status(500).json({
				message: "error",
				error: "please go sign up",
			});
		} else {
			let comparedPassword = await bcrypt.compare(
				password,
				foundUser.password
			);

			if (!comparedPassword) {
				return res.status(500).json({
					message: "error",
					error: "Please check your email and password",
				});
			} else {
				
				let jwtToken = jwt.sign(
					{
						email: foundUser.email,
						username: foundUser.username
					},
					process.env.JWT_SECRET,
					{ expiresIn: "24h"}
				)

				res.json({ message: "success", payload: jwtToken})
			}
		}
	} catch (e) {
		res.status(500).json({ message: "error", error: e.message });
	}
}



//not in class
async function getAllUser(req, res) {
	try {
		let fetchedUser = await User.find({});

		res.json({ message: "success", payload: fetchedUser });
	} catch (error) {
		res.status(500).json({
			message: "you have failed",
			error: error.message,
		});
	}
}
async function deleteUserById(req, res) {
	try {
		let deletedUser = await User.findByIdAndDelete(req.params.id);

		res.json({ message: "success", payload: deletedUser });
	} catch (error) {
		res.status(500).json({
			message: "you have failed",
			error: error.message,
		});
	}
}

module.exports = {
	getAllUser,
	createUser,
	deleteUserById,
	login,
};
