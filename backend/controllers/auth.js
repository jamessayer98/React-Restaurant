const { pick, get, assign } = require("lodash");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const { createValidate, updateValidate } = require("../utils");

const login = async (req, res, next) => {
	try {
		
	} catch (error) {
		res.status(500).send({ message: "Internal server error" });
		next(error);
	}
}

const signUp = async (req, res, next) => {
	try {
		const { error } = createValidate(req.body);
		const { role } = req.body || {};

		if (error) {
			return res.status(400).send({
				message: get(error, "details.0.message", "Something went wrong")
			});
		}

		let user = await User.findOne({ email: req.body.email });

		if (role === "admin") {
			return res.status(400).send({ message: "Can not sign up as admin"});
		}

		if (user) {
			return res.status(409).send({ message: "User already registered"});
		}

		user = new User(
			pick(req.body, [
				"firstName",
				"lastName",
				"email",
				"password",
				"passwordConfirm",
				"role"
			])
		);

		const newUser = await user.save();

		res.status(201).send({
			user: pick(newUser, ["firstName", "lastName", "email", "_id", "role"])
		});
	} catch (error) {
		res.status(500).send({ message: "Internal server error" });
		next(error);
	}
}