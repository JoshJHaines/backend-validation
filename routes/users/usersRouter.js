var express = require("express");
var router = express.Router();
const {
	checkIsEmpty,
	checkIsUndefined,
	validateCreateData,
	validateLoginData,
} = require("./lib/authMiddleware");

const {
	createUser,
	getAllUser,
	deleteUserById,
	login,
} = require("./controller/userController");
/* GET users listing. */

router.get("/", getAllUser);

router.post(
	"/create-user",
	checkIsUndefined,
	checkIsEmpty,
	validateCreateData,
	createUser
);
router.post(
	"/login",
	checkIsUndefined,
	checkIsEmpty,
	validateLoginData,
	login);

router.delete("/delete-user-by-id/:id", deleteUserById);

module.exports = router;
