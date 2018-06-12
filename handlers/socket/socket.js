const WebSocket = require('ws')

class BoatWebsocketServer {
	constructor(port) {
		this.port = port
		this.server = new WebSocket.Server({
			port: this.port
		})
		this.connections = []

		console.log(`Listening for socket connections on ::${this.port}`)

		// add new connections to the connection list
		this.server.on("connection", (ws) => {
			this.connections.push(ws)
		})
	}

	broadcast(name, data) {
		let out = []

		for (let i = 0; i < this.connections.length; i++) {
			const ws = this.connections[i]

			// if closed
			if (ws.readyState === 3) continue

			out.push(ws)
			ws.send(JSON.stringify({
				name,
				data
			}))
		}
		this.connections = out
	}
}

module.exports = BoatWebsocketServer