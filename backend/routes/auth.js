const express = require("express");
const router = express.Router();

const auth = require("../controllers/auth");
const authMiddleware = require("../middlewares");

router.post("/login", auth.login);
router.post("/signup", auth.signUp);
router
  .route("/updateprofile")
  .put(authMiddleware, auth.updateProfile);
router
  .route("/removeprofile")
  .delete(authMiddleware, auth.removeProfile);

module.exports = router;
