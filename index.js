const express = require('express')
const mongoose = require('mongoose')

const UserHandler = require('./handlers/userHandler')
const PackageHandler = require('./handlers/packageHandler')

const Package = require('./models/package')

const config = require('./config.json')

const app = express()

mongoose.connect(`mongodb://${config.mongo.host}/${config.mongo.database}`)
const db = mongoose.connection

// handle mongoose events
db.on('error', (err) => {
	console.error('connection error:', err)
	process.exit(0)
})
db.once('open', () => {
	console.info('Connected to the mongodb database!')
})

// routes
app.get('/', (req, res) => {
	res.json({
		success: true,
		endpoints: [
			{
				method: "GET",
				endpoints: [
					"/users",
					"/users/:id",
					"/users/:id/packages",
					"/packages",
					"/packages/:id",	
				]
			},
			{
				method: "POST",
				endpoints: [
					"/packages/:id/lock",
					"/packages/:id/unlock",					
				]
			}
		]
	})
})

app.get('/users', UserHandler.all)
app.get('/users/:id', UserHandler.get)
app.get('/users/:uid/packages', PackageHandler.getAllByUser)

app.get('/packages', PackageHandler.getAll)
app.get('/packages/:id', PackageHandler.get)
app.post('/packages/:id/lock', PackageHandler.lock)
app.post('/packages/:id/unlock', PackageHandler.unlock)



/*app.get('/test', (req, res) => {
	const user = new User({
		firstName: "nick",
		lastName: "vernij",	
		email: "nick@nickforall.nl",
		lat: 0,
		lng: 0,
	})

	user.save()
		.then(() => res.json({user}))
		.catch((err) => res.json({err, success: false}))
})*/

// start express
app.listen(config.server.port, () => {
	console.info(`API server is listening on ::${config.server.port}`)
})