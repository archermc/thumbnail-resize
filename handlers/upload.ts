import AWS from 'aws-sdk';
import { APIGatewayEvent } from 'aws-lambda';
import uuidv4 from 'uuid/v4';
import UploadBody from './uploadBody';
import { createResponse } from '../utils';

export const handler = async (event: APIGatewayEvent) => {
  const payload = JSON.parse(event.body) as UploadBody;

  const s3 = new AWS.S3();

  const bucket = process.env.UPLOAD_BUCKET;

  // probably needs to be processed
  const image = payload.image;

  let key = uuidv4();
  key += ':' + payload.imageName;

  console.log('Key: ' + key);

  try {
    await s3.upload({ Bucket: bucket, Key: key, Body: image }).promise();
  } catch (e) {
    console.error(e, event)
    return createResponse(500, e);
  }

  console.log("Successfully uploaded image!\r\n", event)
  return createResponse(200);
}