const express = require("express");
const router = express.Router();
const auth = require("./auth");
const user = require("./user");
const authMiddleware = require("../middlewares");

router.use("/auth", auth);
router.use("/users", authMiddleware, user);

module.exports = router;
