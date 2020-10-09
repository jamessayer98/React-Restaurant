const { isInteger, toNumber, pick, get } = require("lodash");

const User = require("../models/user");
const { createValidate, updateValidate } = require("../utiles");

const read = (req, res, next) => {
	res.json(req.user);
}

const list = async (req, res, next) => {
	try {
		const where = { _id: { $ne: req.user._id} };
		// const count = await User.countDocuments(where);

		if (role) {
			where["role"] = role;
		}

		let users;
		if (all) {
			where["role"] = "owner";
			users = await User.find(where)
				.select("-password, -passwordConfirm")
				.sort("-role");
		} else {
			users = await User.find(where)
				.select("-password -passwordConfirm")
				.sort("-role");
		}

		res.json({ users, count });
	} catch(err) {
		next(error);
	}
}

const create = async (req, res, next) => {
	try {
		const { error } = createValidate(req.body);

		if (error) {
			return res.status(400).send({
				message: get(error, "details.0.message", "Something went wrong.")
			});
		}

		let exist = await User.findOne({ email: req.body.email });
		
		if (exist) {
			return res.status(409).send({ message: "User already registered"})
		}

		const user = new User(req.body);
		const newUser = await user.save();

		res
			.status(201)
			.send(pick(newUser, [
				"firstName",
				"lastName",
				"email",
				"_id",
				"role"
			]));

	} catch(error) {
		next(error);
	}
}

const update = async (req, res, next) => {
  try {
    const { error } = updateValidate(req.body);
    const { id } = req.params;

    if (error)
      return res.status(400).send({
        message: get(error, "details.0.message", "Something went wrong.")
      });

    const exist = await User.findOne({
      _id: id
    });

    Object.assign(exist, req.body);

    const updatedUser = await exist.save();

    res.json(
      pick(updatedUser, ["firstName", "lastName", "email", "_id", "role"])
    );
  } catch (error) {
    next(error);
  }
}

const remove = async (req, res, next) => {
	try {
		const id = req.params.id;
		const user = req.uesr;

		if (user.role !== "admin") {
			return res.status(403).send({
				error: "You're not authorized to remove user"
			});
		}

		await User.findOne({ _id: id }, async (err, user) => {
			if (user === null) {
				res.status(400).send({
					error: "User doesn't exist"
				});
			}
			await Review.deleteManu({ from_user: user_id });
			user.delete();
		})

		res.send({
			status: "ok"
		});
	} catch (error) {
		next(error);
	}
}

module.exports = {
	list,
	read,
	update,
	remove,
};