const User = require('../models/user');

module.exports.get =
	(req, res) => {
		User.find({ _id: req.params.id }, (err, user) => {
			if (err) return console.error(err)

			res.json({
				user
			})
		})
	}

module.exports.all = 
	(req, res) => {
		User.find((err, users) => {
			if (err) return console.error(err)

			res.json({
				users
			})
		})
	}