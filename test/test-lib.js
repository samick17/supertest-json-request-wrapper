const express = require('express');

function createDummyApp() {
	let app = express();
	let router = express();
	router.get('/todos', (req, res) => {
		res.json([{
			id: '1',
			name: 'TodoItem1'
		}]);
	});
	router.put('/todos/:id', (req, res) => {
		res.json({
			id: req.params.id,
			name: 'TodoItem1'
		});
	});
	router.patch('/todos/:id', (req, res) => {
		res.json({
			id: req.params.id,
			name: 'TodoItem1'
		});
	});
	router.post('/todos', (req, res) => {
		res.json({
			id: '1',
			name: 'TodoItem1'
		});
	});
	router.delete('/todos/:id', (req, res) => {
		res.json({});
	});
	app.use('/api', router);
	return app;
}

module.exports = {
	createDummyApp: createDummyApp
};