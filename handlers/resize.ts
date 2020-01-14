import AWS from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { createResponse } from "../utils";
import { GetObjectRequest } from "./getObjectRequest";
import { S3CreateEvent } from "aws-lambda";

export const handler = async (event: S3CreateEvent) => {
  const s3 = new AWS.S3();
  const thumbnailsBucket = process.env.THUMBNAILS_BUCKET;

  const request = GetObjectRequest.fromEvent(event);

  console.log('Get request:\r\n' + JSON.stringify(request));

  let response: AWS.S3.GetObjectOutput;
  try {
    response = await s3.getObject(request).promise();
  } catch (e) {
    console.error(e, event);
    return createResponse(500, e);
  }

  // actual resizing of image goes here

  const uploadRequest: PutObjectRequest = {
    Bucket: thumbnailsBucket,
    Key: request.Key,
    Body: response.Body
  };

  console.log('Put request:\r\n' + JSON.stringify(uploadRequest));

  try {
    await s3.upload(uploadRequest).promise();
  } catch (e) {
    console.error(e, event);
    return createResponse(500, e);
  }

  return createResponse(200);
}