var express = require('express');
var router = express.Router();

const { createUser, getAllUser, deleteUserById } = require("./controller/userController")
/* GET users listing. */

router.get("/", getAllUser)

router.post('/create-user', createUser );

router.delete("/delete-user-by-id/:id", deleteUserById)

module.exports = router;
