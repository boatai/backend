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
	owner: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('package', schema);