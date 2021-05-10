const aws = require("aws-sdk");
const apigateway = new aws.APIGateway();
const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider();

exports.handler = async (event, context, callback) => {
  // console.log(event, "EVENT SIGN UP");

  // console.log(apigateway, "apigateway");

  var params = {
    UserPoolId: event["userPoolId"] /* required */,
    AttributesToGet: [
      "email",
      /* more items */
    ],
    // Filter: "STRING_VALUE",
    // Limit: "NUMBER_VALUE",
    // PaginationToken: "STRING_VALUE",
  };

  console.log(params, "params");

  console.log("BEFORE _SERVICE PROVIEDr");
  const response = cognitoidentityserviceprovider.listUsers(
    params
    // (err, data) => {
    //   console.log("LIST USERS");
    //   console.log(params, "params");
    //   console.log(data, "DATA");
    //   console.log(err, "err");
    //   if (err) {
    //     console.log(err, err.stack);
    //     callback(err); // here is the error return
    //   } else {
    //     // console.log(data, "DATA");
    //     callback(null, data); // here is the success return
    //   }
    // }
  );

  console.log("AFTER SERVICE PROVIDER");
  console.log(response, "INIT_RESPONSE");
  // console.log(response, "responseUSESR");
  const rawUsers = await response.promise();

  console.log(rawUsers, "rawsUsrs");
  // insert code to be executed by your lambda trigger
  // const email = event["request"]["userAttributes"]["email"];

  // //  Find a user with the same email
  // let response = cognitoidentityserviceprovider.listUsers(
  //   (UserPoolId = event["userPoolId"]),
  //   (AttributesToGet = ["email"]),
  //   (Filter = 'email = "{}"'.format(email))
  // );

  let date = new Date();
  if (event.request.userAttributes.sub) {
    console.log(
      event.request.userAttributes.sub,
      "event.request.userAttributes.sub"
    );
    // let params = {
    //   Item: {
    //     id: { S: event.request.userAttributes.sub },
    //     __typename: { S: "User" },
    //     username: { S: event.userName },
    //     email: { S: event.request.userAttributes.email },
    //     createdAt: { S: date.toISOString() },
    //     updatedAt: { S: date.toISOString() },
    //   },
    //   TableName: process.env.USERTABLE,
    // };

    try {
      // await ddb.putItem(params).promise();
      console.log("Success PRESIGN UP ");
    } catch (err) {
      console.log("Error", err);
    }

    console.log("Success: Everything executed correctly");
    context.done(null, event);
  } else {
    console.log("Error: Nothing was pre sign up ");
    context.done(null, event);
  }

  callback(null, event);
};
