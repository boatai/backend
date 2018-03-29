const express = require('express')
const mongoose = require('mongoose')
const config = require('./config.json')

const app = express()

mongoose.connect(`mongodb://${config.mongo.host}/${config.mongo.database}`)
const db = mongoose.connection

// handle mongoose events
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
	console.info('Connected to the mongodb database!')
	process.exit(0)
})

app.get('/', (req, res) => {
	res.json({
		success: true,
	})
})

app.listen(config.server.port, () => {
	console.info(`API server is listening on ::${config.server.port}`)
})