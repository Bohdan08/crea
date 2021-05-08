// update db auth

var aws = require("aws-sdk");
var ddb = new aws.DynamoDB();

exports.handler = async (event, context) => {
  // console.log(event, "EVENT");
  let date = new Date();
  console.log(event.request.userAttributes, "event.request.userAttributes");
  if (event.request.userAttributes.sub) {
    // console.log(event.request.userAttributes, "event.request.userAttributes");
    let params = {
      Item: {
        // ...event.request.userAttributes,
        id: { S: event.request.userAttributes.sub },
        address: { S: "try adress out" },
        __typename: { S: "User" },
        username: { S: event.userName },
        email: { S: event.request.userAttributes.email },
        // ["custom:Example"]: { S: event.request.userAttributes['custom:Example'] },
        createdAt: { S: date.toISOString() },
        updatedAt: { S: date.toISOString() },
      },
      TableName: process.env.USERTABLE,
    };

    try {
      await ddb.putItem(params).promise();
      console.log("Success");
    } catch (err) {
      console.log("Error", err);
    }

    console.log("Success: Everything executed correctly");
    context.done(null, event);
  } else {
    console.log("Error: Nothing was written to DynamoDB");
    context.done(null, event);
  }
};
