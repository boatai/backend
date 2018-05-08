const User = require('../models/user');
const Common = require('./common')

module.exports.get =
	(req, res) => {
		User.findOne({ _id: req.params.id }, (err, user) => {
			if (err) console.error(err)

			Common.handleExpressObjectError(res, err, user)			

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