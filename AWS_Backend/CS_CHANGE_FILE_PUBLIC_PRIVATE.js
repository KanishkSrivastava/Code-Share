const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const { status, id, fileId } = event;
  const paramsOfDB = {
    TableName: process.env.DB_NAME,
    Key: { User_Id: id },
    UpdateExpression: 'SET Make_Private.#id = :val',
    ExpressionAttributeNames: { '#id': fileId },
    ExpressionAttributeValues: { ':val': status }
  };
  try {
    await docClient.update(paramsOfDB).promise();
    const response = { statusCode: 200, body: `Changed status of ${fileId}` };
    return response;
  } catch (e) {
    const response = { statusCode: 500, body: `Error in changing status of ${fileId}`, error: e.message };
    return response;
  }
};
