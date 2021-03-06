const express = require("express");
const router = express.Router();
const auth = require("./auth");
const restaurant = require("./restaurant");
const review = require("./review");
const user = require("./user");
const authMiddleware = require("../middlewares");

router.use("/auth", auth);
router.use("/users", authMiddleware, user);
router.use("/", authMiddleware, review);
router.use("/restaurants", authMiddleware, restaurant);

module.exports = router;
