const User = require('../users/users-model');

function logger(req, res, next) {
	const timestamp = new Date().toLocaleDateString();
	const method = req.method;
	const url = req.originalUrl;
	console.log(`[${timestamp}] ${method} ${url}`);
	next();
}

async function validateUserId(req, res, next) {
	try {
		const user = await User.getById(req.params.id);
		if (!user) {
			res.status(404).json({
				message: 'user not found',
			});
		} else {
			req.user = user;
			next();
		}
	} catch (error) {
		res.status(500).json({
			message: 'problem getting user',
		});
	}
}

function validateUser(req, res, next) {
	const { name } = req.body;
	if (!name || typeof name !== 'string' || !name.trim()) {
		res.status(400).json({
			message: 'missing required name field',
		});
	} else {
		req.name = name.trim();
		next();
	}
}

function validatePost(req, res, next) {
	if (!req.body.text || typeof req.body.text !== 'string') {
		res.status(404).json({
			message: 'missing required text field',
		});
	} else {
		next();
	}
}

// do not forget to expose these functions to other modules

module.exports = { logger, validateUserId, validateUser, validatePost };
