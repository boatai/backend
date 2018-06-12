module.exports.startMockInterval =
	(interval, socket) => {
		setInterval(() => {
			socket.broadcast('boat', {
				lat: 0,
				lng: 0
			})
		}, interval)
	}