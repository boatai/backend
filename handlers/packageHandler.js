const Package = require('../models/package')

module.exports.getAllByUser = 
	(req, res) => {
		let packages = Package.find({ owner: req.params.uid }, (err, package) => {
			if (err) return console.error(err)

			res.json({
				package
			})
		})
	}

module.exports.getAll = 
	(req, res) => {
		let packages = Package.find((err, packages) => {
			if (err) return console.error(err)

			res.json({
				packages
			})
		})
	}

module.exports.get =
	(req, res) => {
		Package.find({ _id: req.params.id }, (err, packages) => {
			if (err) return console.error(err)

			res.json({
				packages
			})
		})
	}