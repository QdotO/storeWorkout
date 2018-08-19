#!/bin/bash
file=./storeworkouts.zip
if [ -e "$file" ]; then
    echo "zip already exists"
    echo "Erasing...."
    rm -r storeworkouts.zip
fi 

zip -r storeworkout.zip . -x *.git*
echo "All zipped up"
echo "Now deploying..."
aws lambda update-function-code --function-name StoreWorkout --zip-file fileb://storeworkout.zip