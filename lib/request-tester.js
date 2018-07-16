(function() {

    const requestAgent = require('./request-agent');
    //method: GET, PUT, POST, DELETE
    //routePath: api routing path
    function requestRetrieveTest(options) {
        let method = options.method;
        let routePath = options.path;
        let status = options.status;
        let data = options.data;
        let titlePostfix = options.titlePostfix;
        let testName = method.toUpperCase() + ' ' + routePath + ' - ' + (status === 200 ? 'success' : 'fail') + (titlePostfix ? titlePostfix : '');
        let testExecutor = this;
        it(testName, function(done) {
            testExecutor.requestAgent[method.toLowerCase()](routePath, status, data, done);
        }).timeout(testExecutor.timeout);
    }

    function createRequestRetrieveTestHandler(testExecutor, method) {
        return function(options) {
            options.method = method;
            return requestRetrieveTest.apply(testExecutor, [options]);
        };
    }

    function requestModifyTest(options) {
        let method = options.method;
        let routePath = options.path;
        let body = options.body;
        let status = options.status;
        let data = options.data;
        let titlePostfix = options.titlePostfix;
        let testName = method.toUpperCase() + ' ' + routePath + ' - ' + (status === 200 ? 'success' : 'fail') + (titlePostfix ? titlePostfix : '');
        let testExecutor = this;
        it(testName, function(done) {
            testExecutor.requestAgent[method.toLowerCase()](routePath, body, status, data, done);
        }).timeout(testExecutor.timeout);
    }

    function createRequestModifyTest(testExecutor, method) {
        return function(options) {
            options.method = method;
            return requestModifyTest.apply(testExecutor, [options]);
        };
    }

    function createTestExecutor(requestAgent, timeout) {
        let testExecutor = {
            requestAgent: requestAgent,
            timeout: timeout
        };
        testExecutor.testGET = createRequestRetrieveTestHandler(testExecutor, 'get');
        testExecutor.testDELETE = createRequestRetrieveTestHandler(testExecutor, 'delete');
        testExecutor.testPOST = createRequestModifyTest(testExecutor, 'post');
        testExecutor.testPUT = createRequestModifyTest(testExecutor, 'put');
        testExecutor.testPATCH = createRequestModifyTest(testExecutor, 'patch');
        return testExecutor;
    }

    function create(app, timeout) {
        let testAgent = requestAgent.createAgent(app);
        return createTestExecutor(testAgent, timeout);
    }

    module.exports = {
        create: create
    };
})();