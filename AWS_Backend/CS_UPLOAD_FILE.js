const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const docClient = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid/v4');

exports.handler = async event => {
  const { content, path, id } = event;
  const fileId = uuid();
  const filePath = `ALL_FILES/${event.id}/${fileId}`;
  const paramsOfS3 = { Body: content, Bucket: process.env.BUCKET_NAME, Key: filePath };
  const paramsOfDB = {
    TableName: process.env.DB_NAME,
    Key: { User_Id: id },
    UpdateExpression: 'SET FILES.#id = :path',
    ExpressionAttributeNames: { '#id': fileId },
    ExpressionAttributeValues: { ':path': path }
  };
  try {
    await s3.upload(paramsOfS3).promise();
    await docClient.update(paramsOfDB).promise();
    const response = { status: 200, body: `File uploaded of id ${fileId}`, path };
    return response;
  } catch (e) {
    const response = { status: 200, body: `File upload error of id ${fileId}`, error: e.message };
    return response;
  }
};
