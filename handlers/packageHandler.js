const Package = require('../models/package')
const Common = require('./common')

module.exports.getAllByUser = 
	(req, res) => {
		let packages = Package.find({ owner: req.params.uid }, (err, packages) => {
			if (err) return console.error(err)

			res.json({
				packages
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
		Package.findOne({ _id: req.params.id }, (err, package) => {
			if (err) console.error(err)

			Common.handleExpressObjectError(res, err, package)

			res.json({
				package
			})
		})
	}

module.exports.unlock = 
	(req, res) => {
		Package.update({ _id: req.params.id }, { unlocked: true }, (err, package) => {
			if (err) return console.error(err)

			Package.findOne({ _id: req.params.id }, (err, package) => {
				if (err) return console.error(err)
	
				res.json({
					success: true,
					package
				})
			})
		})
	}

module.exports.lock =
	(req, res) => {
		Package.update({ _id: req.params.id }, { unlocked: false }, (err, package) => {
			if (err) return console.error(err)

			Package.findOne({ _id: req.params.id }, (err, package) => {
				if (err) return console.error(err)
	
				res.json({
					success: true,
					package
				})
			})
		})
	}