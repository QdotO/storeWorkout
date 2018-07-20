// checkRequestBody.js

module.exports = (request) => {
	return new Promise((resolve, reject) => {
		if(typeof request.workout == 'undefined'){
			return reject("workout is undefined");
		}else {
			console.log("Request checks out...");
			return resolve(request);
		}
	}).catch(error => {
		console.log("checkRequestBody error: ", error);
		return Promise.reject({
			errorType: "checkRequestBody error",
			errorData: error
		})
	});
};