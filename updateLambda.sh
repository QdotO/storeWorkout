zip -r storeworkout.zip .
aws lambda update-function-code --function-name StoreWorkout --zip-file fileb://storeworkout.zip