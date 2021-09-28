var express = require('express');
var router = express.Router();

const { createUser, getAllUser } = require("./controller/userController")
/* GET users listing. */

router.get("/", getAllUser)

router.post('/create-user', createUser );

module.exports = router;
