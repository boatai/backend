const Package = require('../models/package')
const User = require('../models/user')

const Common = require('./common')

module.exports.getAllByUser = 
	(req, res, next) => {
		Package.find({ owner: req.params.uid }, (err, packages) => {
			if (err) return next(err)

			res.json({
				success: true,				
				packages
			})
		})
	}

module.exports.create =
	(req, res, next) => {
		Package.create(req.body, (err, package) => {
			if (err) return next(err)
			
			res.json({
				success: true,				
				package
			})
		})
	}

module.exports.getAll = 
	(req, res, next) => {
		Package.find((err, packages) => {
			if (err) return next(err)

			res.json({
				success: true,				
				packages
			})
		})
	}

module.exports.get =
	(req, res, next) => {
		Package.findOne({ _id: req.params.id }, (err, package) => {
			if (err) next(err)

			Common.handleExpressObjectError(res, err, package)

			res.json({
				success: true,				
				package
			})
		})
	}

module.exports.unlock = 
	(req, res, next) => {
		Package.update({ _id: req.params.id }, { unlocked: true }, (err, package) => {
			if (err) return next(err)

			Package.findOne({ _id: req.params.id }, (err, package) => {
				if (err) return next(err)
	
				res.json({
					success: true,
					package
				})
			})
		})
	}

module.exports.lock =
	(req, res, next) => {
		Package.update({ _id: req.params.id }, { unlocked: false }, (err, package) => {
			if (err) return next(err)

			Package.findOne({ _id: req.params.id }, (err, package) => {
				if (err) return next(err)
	
				res.json({
					success: true,
					package
				})
			})
		})
	}

module.exports.assign =
	(req, res, next) => {
		User.findOne({ _id: req.body.userId }, (err, user) => {
			if (err) return next(err)
			if (!user) return res.status(400).json({ success: false, error: 'user not found'})

			Package.update({ _id: req.params.id }, { owner: user._id }, (err, package) => {
				if (err) return next(err)

				return res.json({
					success: true,
					package
				})
			})
		})
	}