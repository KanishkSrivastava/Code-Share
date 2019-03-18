const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const { newName, id, fileId } = event;
  const paramsOfDB = {
    TableName: process.env.DB_NAME,
    Key: { User_Id: id },
    UpdateExpression: 'SET FILES.#id = :path',
    ExpressionAttributeNames: { '#id': fileId },
    ExpressionAttributeValues: { ':path': newName }
  };
  try {
    await docClient.update(paramsOfDB).promise();
    const response = { statusCode: 200, body: `File renamened` };
    return response;
  } catch (e) {
    const response = { statusCode: 500, body: `File rename error`, error: e.message };
    return response;
  }
};
