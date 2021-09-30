var express = require('express');
var router = express.Router();

const { createUser, getAllUser, deleteUserById, login } = require("./controller/userController")
/* GET users listing. */

router.get("/", getAllUser)

router.get("/login", login)

router.post('/create-user', createUser );

router.delete("/delete-user-by-id/:id", deleteUserById)

module.exports = router;
