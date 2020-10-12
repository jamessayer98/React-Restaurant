const Restaurant = require("../models/restaurant");
const Review = require("../models/review");
const User = require("../models/user");
const ObjectId = require("mongodb").ObjectID;
const _ = require("lodash");

const post = async (req, res, next) => {
  try {
    let { name = "", user: reqUser = null } = req.body || {};
    const { user } = req;

    if (!name) {
      return res.status(400).send({
        message: "Name is required."
      });
    }

    if (user.role === "regular") {
      return res.status(403).send({
        message: "You're not authorized to create a restaurant."
      });
    }

    const rest = await Restaurant.findOne({ name });
    if (rest) {
      return res.status(409).send({
        message: "Restaurant already exists with same name."
      });
    }

    if (!ObjectId.isValid(reqUser) && user.role === "admin") {
      return res.status(422).send({
        message: "User ID is not valid id."
      });
    }

    const existUser = await User.findOne({
      _id: ObjectId(reqUser),
      role: "owner"
    });

    if (!existUser && user.role === "admin") {
      return res
        .status(422)
        .send({ message: "Restaurant is authorized to only owners" });
    }

    const restaurant = await Restaurant.create({
      name: name,
      user: user.role === "admin" ? ObjectId(reqUser) : user,
      overall_rating: 0,
      highest_rating: 0,
      lowest_rating: 0,
      reviews: []
    });

    return res.status(201).send({ restaurant });
  } catch (err) {
    next(err);
  }
}

const list = async (req, res, next) => {
  try {
    
  } catch (err) {
    next(err);
  }
}