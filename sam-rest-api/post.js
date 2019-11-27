const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-2'});

const dynamodb = new AWS.DynamoDB.DocumentClient();

// get table name from environment variable (available when SAM d'deploy the Lambda Function)
const tableName = process.env.TABLE_NAME;

// 7-153 data to write from the POST Request will be in the event (as per normal)

exports.handler = async(event) => {
    let userid = event.pathParameters.userid;   // get the userid from the URL/path rather than from inside the HTTP Request
    let {firstName, lastName, email, website} = JSON.parse(event.body);   // declare/define as an object's properties from the POST'd Request's body data content (POST this from Postman to check)

    let item = {
        userid: userid,
        firstName: firstName,
        lastName: lastName,
        email: email,
        website: website
    }       // item, from POST'd data, ready to put into DynamoDB table as 'record'

    let data = await dynamodb.put(  // use the dynamodb to put a record
        {
            TableName: tableName,
            Item: item
        }
    ).promise();    // use promise to do this asynchronously


    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: "Data inserted/updated."
            }
        )
    };
}
