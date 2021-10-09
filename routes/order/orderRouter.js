var express = require("express");
var router = express.Router();
var { jwtMiddleware } = require("../users/lib/authMiddleware")

router.get("/", function (req, res, next) {
    res.json({ message: "order"})
})

router.post("/create-order", jwtMiddleware, async function (req, res) {
    
})

module.exports = router;