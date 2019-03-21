const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const { id, fileId } = event;
  const params = {
    TableName: process.env.DB_NAME,
    Key: { User_Id: id }
  };
  try {
    const { Item } = await docClient.get(params).promise();
    const status = Item.Make_Private[fileId];
    const response = {
      statusCode: 200,
      body: `Response returned for file id ${fileId}`,
      status
    };
    return response;
  } catch (e) {
    const response = {
      statusCode: 500,
      body: `Error for the file id  ${fileId}`,
      error: e.message
    };
    return response;
  }
};
