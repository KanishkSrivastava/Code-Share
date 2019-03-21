const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const { id, fileId } = event;
  const paramsOfS3 = { Bucket: process.env.BUCKET_NAME, Key: `ALL_FILES/${id}/${fileId}` };
  const paramsOfDB = {
    TableName: process.env.DB_NAME,
    Key: { User_Id: id },
    UpdateExpression: 'REMOVE FILES.#id, Make_Private.#id',
    ExpressionAttributeNames: { '#id': fileId }
  };

  try {
    await s3.deleteObject(paramsOfS3).promise();
    await docClient.update(paramsOfDB).promise();
    const response = { statusCode: 200, body: `File removed of id ${fileId}` };
    return response;
  } catch (e) {
    const response = { statusCode: 500, body: `File remove error of id ${fileId}`, error: e.message };
    return response;
  }
};
