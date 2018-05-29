const mongoose = require('mongoose')
const schema = new mongoose.Schema({
	boatId: mongoose.Schema.Types.ObjectId,
	status: {
		type: String,
		required: true,
  	},
	name: {
		type: String,
		required: true,
	},
	unlocked: {
		type: Boolean,
		default: false,
	},
	size: {
		type: String,
		default: "20 x 20 x 10 cm",
	},
	weight: {
		type: String,
		default: "400g",
	},
	deliveryDate: {
		type: Date,
		default: Date.now,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
})

module.exports = mongoose.model('package', schema);