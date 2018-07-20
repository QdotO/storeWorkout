// storeWorkout.js
const checkRequestBody = require('./checkRequestBody.js');
const putInDb = require('putInDb.js');

module.exports = (request)=> {
	return checkRequestBody(request).then(putInDb);
};