// putInDb.js
const WORKOUT_TABLE_NAME = process.env.WORKOUT_TABLE_NAME || "workouts";
const dateTime = require('date-and-time');
var AWS = require("aws-sdk");
const UUID = require('uuid/v4');
AWS.config.update({ region: "us-east-2" });
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = (request) => {
	return new Promise((resolve, reject) =>{
		var nowDate = dateTime.format(new Date(), 'ddd MMM DD YYYY');
		var uuid = UUID();
		var params = {
			TableName: WORKOUT_TABLE_NAME,
			Item: {
				uuid: uuid,
				timestamp: nowDate,
				userId: request.userId,
				type: request.workout.type,
				subtype: request.workout.subType,
				rest: request.workout.rest,
				exercise: request.workout.exercises
			}
		};

		console.log("Storing in DB: " +  JSON.stringify(params, null, 2));
		docClient.put(params, function(err, data){
			if(err){
				return reject(err);
			}
			else{
				console.log(`Added workout to ${WORKOUT_TABLE_NAME} table: ` + JSON.stringify(data, null, 2));
				return resolve(request.workout);
			}
		});
	}).catch(error => {
		console.log("putInDb error: ", error);
		return Promise.reject({
			errorType: "putInDb error",
			errorData: error
		});
	});
};


// Sample Workout
// {
// 	Type: "Weight Lifting",
// 	Subtype: "Full Body",
// 	Rest: 60
// 	Exercises: [
// 		{
// 			Lift: "Leg Press",
// 			Reps: 15,
// 			Sets: 4
// 		}, 
// 		{
// 			Lift: "Seated Row",
// 			Reps: 15,
// 			Sets: 4
// 		}, 
// 		{
// 			Lift: "Incline DB Bench",
// 			Reps: 15,
// 			Sets: 4
// 		},
// 		{
// 			Lift: "Side Lateral Raise",
// 			Reps: 15,
// 			Sets: 4
// 		}, 
// 		{
// 			Lift: "Incline DB Curls",
// 			Reps: 15,
// 			Sets: 4
// 		}
// 	]
// }