const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const permissions = require("../utils");

router.use(permissions.hasRole(["admin"]));

router
  .route("/")
  .get(user.list)
  .post(user.create);

router
  .route("/:id")
  .get(user.read)
  .put(user.update)
  .delete(user.remove);

module.exports = router;
