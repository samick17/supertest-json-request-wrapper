describe('request-test-executor', () => {
	const testLib = require('./test-lib');
	const requestTester = require('../lib/request-tester');
	const assert = require('chai').assert;

	let app = testLib.createDummyApp();
	let tester = requestTester.create(app, 2000);

	tester.testGET({
		path: '/api/todos',
		status: 200,
		data: [{
			id: '1',
			name: 'TodoItem1'
		}],
		titlePostfix: ': TODOListAPI',
		//postAction is optional
		postAction: (done) => {
			done();
		}
	});

	tester.testPUT({
		path: '/api/todos/1',
		body: {
			id: '1'
		},
		status: 200,
		data: {
			id: '1',
			name: 'TodoItem1'
		},
		titlePostfix: ': TODOListAPI'
	});

	tester.testPATCH({
		path: '/api/todos/1',
		body: {
			id: '1'
		},
		status: 200,
		data: {
			id: '1',
			name: 'TodoItem1'
		},
		titlePostfix: ': TODOListAPI'
	});

	tester.testPOST({
		path: '/api/todos',
		body: {
			id: '1'
		},
		status: 200,
		data: {
			id: '1',
			name: 'TodoItem1'
		},
		titlePostfix: ': TODOListAPI'
	});

	tester.testDELETE({
		path: '/api/todos/1',
		status: 200,
		data: {},
		titlePostfix: ': TODOListAPI'
	});

});