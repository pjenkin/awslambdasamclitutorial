const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-2'});

const dynamodb = new AWS.DynamoDB.DocumentClient();

// get table name from environment variable (available when SAM d'deploy the Lambda Function)
const tableName = process.env.TABLE_NAME;

exports.handler = async(event) => {
    let userid = event.pathParameters.userid;   // get the userid from the URL/path - cf tempate.yaml 7-154@5:00

    let data = await dynamodb.delete({          // await promise (asynchronously)
        TableName: tableName,
        Key: {
            userid: userid
        }
    }).promise();   // NB all 3 dynamodb operations (i) promise'd (ii) await'd - 7-153 Finish the Lambda code

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: "User deleted successfully."
            }
        )
    };
}
