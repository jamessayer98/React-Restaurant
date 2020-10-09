const { pick, get, assign } = require("lodash");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const { createValidate } = require("../utils");
const e = require("express");

const login = async (req, res, next) => {
	try {
		const { email = "", password = "" } = req.body || {};

		if (!email) {
			return res.status(400).send({ message: "Email is required"});
		}

		if (!password) {
			return res.status(400).send({ message: "Password is required"});
		}

		const user = await User.findOne({ email: req.body.email })
			.select("_id password email firstName lastName role")
			.exec();
		
		if (!user) {
			return res.status(401).send({
				message: "Not registered user"
			});
		}

		if (bcrypt.compareSync(req.body.password, user.password)) {
			const token = user.getAuthToken();

			res.json({
				info: pick(user, ["_id", "firstName", "lastName", "email", "role"]),
				token
			});
		} else {
			res.status(401).send({ message: "Password is incorrect" });
		}
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

module.exports = {
	login,
	signUp,
};