const bcrypt = require("bcryptjs")
const User = require("../model/User");

function checkIsEmpty(target) {
	if (target.length === 0) {
		return true;
	} else {
		return false;
	}
}
function checkForNumbersAndSymbol(target) {
	if (target.match(/[!`\-=@#$%^&*()\[\],.?":;{}|<>1234567890]/g)) {
		return true;
	} else {
		return false;
	}
}
function checkSymbol(target) {
	if (target.match(/[!`\-=@#$%^&*()\[\],.?":;{}|<>]/g)) {
		return true;
	} else {
		return false;
	}
}

function checkIsEmail(target) {
	if (target.match(/\S+@\S+\.\S+/)) {
		return true;
	} else {
		return false;
	}
}

function checkPasswordStrength(target) {
	var strongRegex = new RegExp(
		"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@#$%^=-{}[]&*|:;'?.<>`~])(?=.{8,})"
	);
	return !strongRegex.test(target);
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
		if (checkIsEmpty(body[key])) {
			errObj[`${key}`] = `${key} cannot be empty`;
		}
	}
	if (checkForNumbersAndSymbol(firstName)) {
		errObj.firstName =
			"first name cannot contain special characters and numbers";
	}

	if (checkForNumbersAndSymbol(lastName)) {
		errObj.lastName =
			"last name cannot contain special characters and numbers";
	}

	if (checkSymbol(username)) {
		errObj.username =
			"username cannot contain special characters and numbers";
	}

	if (!checkIsEmail(email)) {
		errObj.username = "email is not a valid email";
	}

    if (checkPasswordStrength(password)) {
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
