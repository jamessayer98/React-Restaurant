const { isInteger, toNumber, pick, get } = require("lodash");

const User = require("../models/user");
const { createValidate, updateValidate } = require("../utiles");
// const Restaurant = require("../models/restauarant");

function read(req, res, next) {
	res.json(req.user);
}

const list = async (req, res, next) => {
	try {
		
	} catch(err) {
		next(error);
	}
}

module.exports = {
	list,
	read,
};