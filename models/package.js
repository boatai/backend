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
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
})

module.exports = mongoose.model('package', schema);