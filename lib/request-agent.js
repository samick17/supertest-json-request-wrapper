(function() {
    let request = require('supertest');
    let agent = {};
    function createAgent(app) {
        if(!agent.appAgent) {
            agent.appAgent = request.agent(app);
            agent.get = requestGet;
            agent.delete = requestDelete;
            agent.put = requestPut;
            agent.patch = requestPatch;
            agent.post = requestPost;
        }
        return agent;
    }

    function precheckAgent(callback) {
        return new Promise(function(resolve, reject) {
            if(agent.appAgent) {
                if(callback) {
                    callback();
                } else {
                    resolve();
                }
            } else {
                let err = new Error('invalid operation, please initialize agent first');
                if(callback) {
                    callback(err);
                } else {
                    reject(err);
                }
            }
        });
    }

    function requestRetrieve(method, routePath, responseStatus, responseData, callback) {
        return precheckAgent()
        .then(function() {
            agent.appAgent[method](routePath)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(responseStatus, responseData, callback);
        }, function(err) {
            callback(err);
        });
    }

    function requestModify(method, routePath, data, responseStatus, responseData, callback) {
        return precheckAgent()
        .then(function() {
            agent.appAgent[method](routePath)
            .set('Accept', 'application/json')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(responseStatus, responseData, callback);
        }, function(err) {
            callback(err);
        });
    }

    function requestGet(routePath, responseStatus, responseData, callback) {
        return requestRetrieve('get', routePath, responseStatus, responseData, callback);
    }

    function requestDelete(routePath, responseStatus, responseData, callback) {
        return requestRetrieve('delete', routePath, responseStatus, responseData, callback);
    }

    function requestPut(routePath, data, responseStatus, responseData, callback) {
        return requestModify('put', routePath, data, responseStatus, responseData, callback);
    }

    function requestPatch(routePath, data, responseStatus, responseData, callback) {
        return requestModify('patch', routePath, data, responseStatus, responseData, callback);
    }

    function requestPost(routePath, data, responseStatus, responseData, callback) {
        return requestModify('post', routePath, data, responseStatus, responseData, callback);
    }

    module.exports = {
        createAgent: createAgent
    };
})();
