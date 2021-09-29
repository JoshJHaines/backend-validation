const User = require("../model/User");

function checkForNumbersAndSymbol(target){
    if(target.match(/[!`\-=@#$%^&*()\[\],.?":;{}|<>1234567890]/g)){
        return true
    } else{ 
        return false
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

    console.log('Check First: ', checkForNumbersAndSymbol(firstName))
    console.log('Check Last: ', checkForNumbersAndSymbol(lastName))
	if (checkForNumbersAndSymbol(firstName)) {
		return res.status(500).json({
			message: "error",
			error: "first name cannot contain special characters and numbers",
		});
	}

	try {
		const createdUser = new User({
			firstName,
			lastName,
			username,
			email,
			password,
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
