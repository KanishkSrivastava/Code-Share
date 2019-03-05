const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async event => {
  const Key = `ALL_FILES/${event.id}/${event.key}`;
  try {
    const data = await s3.getObject({ Bucket: process.env.BUCKET_NAME, Key }).promise();
    const response = { statusCode: 200, body: `Response returned file id ${event.key}`, content: data.Body.toString('ascii') };
    return response;
  } catch (e) {
    const response = { statusCode: 500, body: `Response returned for file id ${event.key}`, error: e.message };
    return response;
  }
};
