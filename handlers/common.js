module.exports.handleExpressObjectError = (res, err, object) => {
	if (err)
		switch (err.name) {
			case "CastError":			
				res.status(404).json({
					success: false,
					error: "Invalid object id",
				})
			break;
		}
	

	if (!object)
		res.status(404).json({
			success: false,
			error: "Object not found"
		})
}