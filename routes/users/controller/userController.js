const bcrypt = require("bcryptjs");
const validator = require("validator");
const User = require("../model/User");

function checkIsEmpty(target) {
	if (target.length === 0) {
		return true;
	} else {
		return false;
	}
}
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
async function createUser(req, res) {
	const { firstName, lastName, username, email, password } = req.body;
	let body = req.body;
	let errObj = {};
	for (let key in body) {
		if (!validator.isLength(body[key], 1)) {
			errObj[`${key}`] = `${key} cannot be empty`;
		}
	}
	if (!validator.isAlpha(firstName)) {
		errObj.firstName =
			"first name cannot contain special characters and numbers";
	}

	if (!validator.isAlpha(lastName)) {
		errObj.lastName =
			"last name cannot contain special characters and numbers";
	}

	if (!validator.isAlphanumeric(username)) {
		errObj.username = "username cannot contain special characters";
	}

	if (!validator.isEmail(email)) {
		errObj.username = "email is not a valid email";
	}

	if (!validator.isStrongPassword(password)) {
		errObj.password = "Make a real passsword loser";
	}
	if (Object.keys(errObj).length > 0) {
		return res.status(500).json({
			message: "error",
			error: errObj,
		});
	}

	try {
		let salt = await bcrypt.genSalt(10);
		let hashed = await bcrypt.hash(password, salt);

		const createdUser = new User({
			firstName,
			lastName,
			username,
			email,
			password: hashed,
		});

		let savedUser = await createdUser.save();
		res.json({ message: "success", payload: savedUser });
	} catch (error) {
		res.status(500).json({ message: "error", error: error.message });
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
};
