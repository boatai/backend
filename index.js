const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const UserHandler = require('./handlers/userHandler')
const PackageHandler = require('./handlers/packageHandler')
const RouteHandler = require('./handlers/route')

const WebsocketServer = require('./handlers/socket/socket')
const LocationSocket = require('./handlers/socket/location')
const Package = require('./models/package')

const config = require('./config.json')

const app = express()

mongoose.connect(`mongodb://${config.mongo.host}/${config.mongo.database}`)
const db = mongoose.connection

// const socket = new WebsocketServer(config.server.socketPort);

// handle mongoose events
db.on('error', (err) => {
	console.error('connection error:', err)
	process.exit(0)
})
db.once('open', () => {
	console.info('Connected to the mongodb database!')
})

app.use(cors())
app.use(bodyParser.json())

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
					"/route"
				]
			},
			{
				method: "POST",
				endpoints: [
					"/packages",					
					"/packages/:id/lock",
					"/packages/:id/unlock",
					"/packages/:id/assign",
					"/route"
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
app.post('/packages', PackageHandler.create)
app.post('/packages/:id/lock', PackageHandler.lock)
app.post('/packages/:id/unlock', PackageHandler.unlock)
app.post('/packages/:id/assign', PackageHandler.assign)

app.get('/route', RouteHandler.get)
app.post('/route', RouteHandler.post)

// start express
app.listen(config.server.port, () => {
	console.info(`API server is listening on ::${config.server.port}`)
})

// LocationSocket.startMockInterval(1000, socket)