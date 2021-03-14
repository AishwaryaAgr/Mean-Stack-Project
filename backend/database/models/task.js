/** @format */

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		minLength: 3,
	},
	listID: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	complete: {
		type: Boolean,
		required: true,
		default: false,
	},
});

const Task = new mongoose.model('Task', taskSchema);

module.exports = Task;
