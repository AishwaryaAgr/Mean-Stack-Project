/** @format */

const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');
const cors = require('cors');
const List = require('./database/models/list');
const Task = require('./database/models/task');

app.use(express.json());
app.use(cors());

app.get('/lists', (req, res) => {
	List.find({})
		.then((lists) => res.send(lists))
		.catch((err) => console.log(err));
});

app.post('/lists', (req, res) => {
	new List({ title: req.body.title })
		.save()
		.then((lists) => res.send(lists))
		.catch((err) => console.log(err));
});

app.get('/lists/:id', (req, res) => {
	List.find({ _id: req.params.id })
		.then((lists) => res.send(lists))
		.catch((err) => console.log(err));
});

app.patch('/lists/:id', (req, res) => {
	List.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
		.then((lists) => res.send(lists))
		.catch((err) => console.log(err));
});

app.delete('/lists/:id', (req, res) => {
	const deleteTasks = (list) => {
		Task.deleteMany({ listID: list._id })
			.then(() => list)
			.catch((err) => console.log(err));
	};
	List.findByIdAndDelete(req.params.id)
        .then((list) => res.send(deleteTasks(list)))
        .catch((error) => console.log(error));
});

// Tasks

app.get('/lists/:id/task', (req, res) => {
	Task.find({ listID: req.params.id })
		.then((tasks) => res.send(tasks))
		.catch((err) => console.log(err));
});

app.post('/lists/:id/task', (req, res) => {
	new Task({ title: req.body.title, listID: req.params.id })
		.save()
		.then((tasks) => res.send(tasks))
		.catch((err) => console.log(err));
});

app.get('/lists/:id/task/:taskid', (req, res) => {
	Task.find({ _id: req.params.taskid, listID: req.params.id })
		.then((tasks) => res.send(tasks))
		.catch((err) => console.log(err));
});

app.patch('/lists/:id/task/:taskid', (req, res) => {
	Task.findOneAndUpdate({ listID: req.params.id, _id: req.params.taskid }, { $set: req.body })
		.then((lists) => res.send(lists))
		.catch((err) => console.log(err));
});

app.delete('/lists/:id/task/:taskid', (req, res) => {
	Task.findByIdAndDelete({ listID: req.params.id, _id: req.params.taskid })
		.then((lists) => res.send(lists))
		.catch((err) => console.log(err));
});

app.listen(3000, () => {
	console.log('Server');
});
