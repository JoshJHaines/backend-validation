var express = require('express');
var router = express.Router();

const { createUser } = require("./controller/userController")
/* GET users listing. */
router.post('/create-user', createUser );

module.exports = router;
