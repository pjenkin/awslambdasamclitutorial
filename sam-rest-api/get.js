const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-2'});

const dynamodb = new AWS.DynamoDB.DocumentClient();

// get table name from environment variable (available when SAM d'deploy the Lambda Function)
const tableName = process.env.TABLE_NAME;

exports.handler = async(event) => {
    let userid = event.pathParameters.userid;   // get the userid from the URL/path
    let data = await dynamodb.get({
        TableName: tableName,
        Key: {
            userid: userid
        }
    }).promise();       // NB asynchronously using promise

    if (data.Item)      // 7-153 if the item is in the data (successfully get'd from db)
    {
        return {
            statusCode: 200,
            body: JSON.stringify(data.Item)   // return, in the body of Response to /get, as JSON, the data for the requested user
        };
    }
    else    // or throw an error if not found
    {
        //throw new Error("User not found.");
        // instead of just throwing an error, return an HTTP Response, of type 404 Not Found, with a body content indicating an error
        return {
            statusCode: 404,
            body: JSON.stringify({message: "User not found"})   // return, in the body of Response to /get, as JSON, the data for the requested user
        };

    }
}
