const jsonfile = require('jsonfile')
const file = '/tmp/route.json'

module.exports.get = 
	(req, res, next) => {
		res.json({ 
			route: jsonfile.readFileSync(file), 
			success: true 
		})
	}

module.exports.post = 
	(req, res, next) => {
		jsonfile.writeFileSync(
			file, 
			req.body.data, 
			{spaces: 2, EOL: '\n'}
		)

		res.json({
			success: true
		})
	}