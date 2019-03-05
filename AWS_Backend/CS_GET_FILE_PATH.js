const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const params = { TableName: process.env.TABLE_NAME, Key: { User_Id: event.id } };
  try {
    const { Item } = await docClient.get(params).promise();
    const response = { statusCode: 200, body: `Response returned for the user ${event.id}`, files: Item.FILES };
    return response;
  } catch (e) {
    const response = { statusCode: 500, body: `Response returned for the user ${event.id}`, error: e.message };
    return response;
  }
};
