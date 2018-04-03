const mongoose = require('mongoose')
const schema = new mongoose.Schema({
	city: String,
	lat: Number,
	lng: Number,	
})

module.exports = mongoose.model('boat', schema);