// putInDb.js
const WORKOUT_TABLE_NAME = process.env.WORKOUT_TABLE_NAME || "workouts";
var AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = (request) => {
	return new Promise((resolve, reject) =>{
		var params = {
			TableName: WORKOUT_TABLE_NAME,
			Item: {
				UserId: request.userId
				// Date: 
				Type: request.workout.type,
				Subtype: request.workout.subType,
				Rest: request.workout.rest,
				Exercise: request.workout.exercises
			}
		}
		docClient.put(params, function(err, data){
			if(err){
				return reject(err);
			}
			else{
				console.log("Added workout to ${WORKOUT_TABLE_NAME} table: " + JSON.stringify(data, null, 2));
				return resolve(request.workout);
			}
		});
	}).catch(error => {
		console.log("putInDb error: ", error);
		return Promise.reject(error);
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