describe('request-agent', () => {
	const testLib = require('./test-lib');
	const requestAgent = require('../lib/request-agent');
	const assert = require('chai').assert;

	let app;

	beforeEach(() => {
		app = testLib.createDummyApp();
	});

	it('GET /api/todos, 200', (done) => {
		let testAgent = requestAgent.createAgent(app);
		testAgent.get('/api/todos', 200, [{
			id: '1',
			name: 'TodoItem1'
		}], (err) => {
			if(err) assert.fail(err.message);
			else done();
		});
	});

	it('PUT /api/todos/1, 200', (done) => {
		let testAgent = requestAgent.createAgent(app);
		testAgent.put('/api/todos/1', {
			id: '1'
		}, 200, {
			id: '1',
			name: 'TodoItem1'
		}, (err) => {
			if(err) assert.fail(err.message);
			else done();
		});
	});

	it('PATCH /api/todos/1, 200', (done) => {
		let testAgent = requestAgent.createAgent(app);
		testAgent.patch('/api/todos/1', {
			id: '1'
		}, 200, {
			id: '1',
			name: 'TodoItem1'
		}, (err) => {
			if(err) assert.fail(err.message);
			else done();
		});
	});

	it('POST /api/todos, 200', (done) => {
		let testAgent = requestAgent.createAgent(app);
		testAgent.post('/api/todos', {
			id: '1'
		}, 200, {
			id: '1',
			name: 'TodoItem1'
		}, (err) => {
			if(err) assert.fail(err.message);
			else done();
		});
	});

	it('DELETE /api/todos/1, 200', (done) => {
		let testAgent = requestAgent.createAgent(app);
		testAgent.delete('/api/todos/1', 200, {}, (err) => {
			if(err) assert.fail(err.message);
			else done();
		});
	});
});