const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: { type: String },
		username: { type: String, required: true, unique: true, index: true },
		email: { type: String, required: true, unique: true, index: true },
		hash: { type: String, required: true },
	},
	{ collection: 'scrawless_users' }
);

mongoose.model('User', userSchema);
