const storeWorkout = require('./storeWorkout.js');

exports.handler = (event, context, callback) => {
    storeWorkout(event).then(response => {
    	console.log("Returning: ", response);
    	callback(null, response);
    }).catch(error => {
    	console.log("storeWorkout error: ", error);
    	callback(error);
    });  
};