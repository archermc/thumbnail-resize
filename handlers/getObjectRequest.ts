import { S3CreateEvent } from "aws-lambda";

export class GetObjectRequest {
  Bucket: string;
  Key: string;

  static fromEvent(event: S3CreateEvent) {
    const bucket = event.Records[0].s3.bucket.name;
    const key = event.Records[0].s3.object.key;

    return new this(bucket, key);
  }

  constructor(bucket: string, key: string) {
    this.Key = key;
    this.Bucket = bucket;
  }
}