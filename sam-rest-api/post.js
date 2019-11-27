const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-2'});

const dynamodb = new AWS.DynamoDB.DocumentClient();

// get table name from environment variable (available when SAM d'deploy the Lambda Function)
const tableName = process.env.TABLE_NAME;

exports.handler = async(event) => {

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                
            }
        )
    };
}
