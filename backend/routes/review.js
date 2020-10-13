const express = require("express");
const router = express.Router();
const review = require("../controllers/review");

router
  .route("/restaurants/:id/reviews")
  .get(review.read)
  .post(review.create);

router
  .route("/restaurants/reviews/:id")
  .put(review.update)
  .delete(review.remove);

module.exports = router;
