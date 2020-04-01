module.exports.profile = async (req, res, next) => {
	res.json({
		message	: "Secure route!",
		user		: req.user,
		token		: req.body.scrawless_jwt
	});
};
