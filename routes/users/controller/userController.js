const User = require("../model/User");

function checkIsEmpty(target){
    if(target.length === 0){
        return true
    }else{
        return false
    }
}
function checkForNumbersAndSymbol(target) {
	if (target.match(/[!`\-=@#$%^&*()\[\],.?":;{}|<>1234567890]/g)) {
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
    //check if empty
    for (let key in body) {
        if (checkIsEmpty(body[key])) {
            errObj[`${key}`] = `${key} cannot be empty`;
        }
    }
	if (checkForNumbersAndSymbol(firstName)) {
		errObj.firstName =
			"first name cannot contain special characters and numbers";
	}
    // if (checkForLength(firstName)){
    //     errObj.firstName = 
    //     "first name cannot be empty";
    // }
	if (checkForNumbersAndSymbol(lastName)) {
		errObj.lastName =
			"last name cannot contain special characters and numbers";
	}
    // if (checkForLength(lastName)){
    //     errObj.lastName = 
    //     "last name cannot be empty";
    // }
    // if (checkForLength(username)){
    //     errObj.username = 
    //     "username cannot be empty";
    // }
    // if (checkForLength(email)){
    //     errObj.email = 
    //     "email cannot be empty";
    // }
    // if (checkForLength(password)){
    //     errObj.password = 
    //     "password cannot be empty";
    // }
	if (Object.keys(errObj).length > 0) {
		return res.status(500).json({
			message: "error",
			error: errObj,
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
