import AWS from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { createResponse } from "../utils";
import { GetObjectRequest } from "./getObjectRequest";
import { S3CreateEvent } from "aws-lambda";
import Jimp, { MIME_JPEG } from 'jimp/es';

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

  const thumbnailKey = getThumbnailKey(request.Key);

  if (!thumbnailKey) {
    return createResponse(400);
  }

  const resized = await resizeImage(response.Body.toString(), 300);

  const uploadRequest: PutObjectRequest = {
    Bucket: thumbnailsBucket,
    Key: thumbnailKey,
    Body: resized
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

const getThumbnailKey = (key: string) => {
  try {
    const nameSplit = key.split(/[./]/);

    const uuid = nameSplit[0];
    const name = nameSplit[1];
    const ext = nameSplit[2];

    return `${uuid}/${name}-thumbnail.${ext}`;
  } catch (e) {
    console.error(`Could not parse key ${key} to get file name`, e);
    return null;
  }
}

const resizeImage = async (image: string, width: number) => {
  console.log('base64: ' + image);
  const photoBuffer = Buffer.from(image, 'base64');

  console.log('buffer: ' + JSON.stringify(photoBuffer));
  const jimp = await Jimp.read(photoBuffer);

  console.log('jimp: ' + JSON.stringify(jimp));
  const f = jimp.resize(width, Jimp.AUTO);

  return f.getBufferAsync(MIME_JPEG);
}