const express = require("express");
const router = express.Router();
const restaurant = require("../controllers/restaurant");

router
  .route("/")
  .get(restaurant.list)
  .post(restaurant.post);

router
  .route("/:id")
  .put(restaurant.update)
  .delete(restaurant.remove);

module.exports = router;