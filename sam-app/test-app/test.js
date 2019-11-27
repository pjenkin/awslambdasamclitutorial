const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-2'});
const lambda = new AWS.Lambda({endpoint: 'http://127.0.0.1:3001/'});    // URL taken from sam local start-lambda

var params = {
    FunctionName: "HelloWorldFunction",
    Payload: new Buffer('{}')
};
// NB HelloWorldFunction over in app.js of the boilerplate from AWS SAM CLI

// invoke the lambda function referred-to
lambda.invoke(params, (err, data) =>
    {
        if(err)
        {
            console.log(err);
        } else
        {
            console.log(data)
        }
    });
    // could have been written async/await instead