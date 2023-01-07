/* eslint-disable @typescript-eslint/no-empty-function */
import { Blob, BucketRepository } from '@app/repositories/bucket-repository';
import { Injectable } from '@nestjs/common';
import { config } from 'src/env';

import AWS, { S3 } from 'aws-sdk';
import { randomUUID } from 'crypto';

@Injectable()
export class S3Repository implements BucketRepository {
  constructor() {}

  private s3: S3;
  private readonly bucket = config.AWS_S3_BUCKET;

  prepare() {
    AWS.config.update({
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    });
  }

  private setInstance() {
    this.prepare();
    this.s3 = new AWS.S3();
  }

  private getInstance() {
    return this.s3;
  }

  async upload(blob: Blob): Promise<{ link: string }> {
    this.setInstance();
    const params = {
      ACL: 'public-read',
      Bucket: this.bucket as string,
      Key: blob.originalname.concat(randomUUID()),
      Body: blob.buffer,
      ContentType: blob.mimetype,
    };

    this.s3.upload(params, (err, data) => {
      if (err) {
        throw new Error('error uploading file', { cause: err });
      }
      return { link: data.location };
    });
    return {
      link: `https://${config.AWS_S3_BUCKET}.s3.amazonaws.com/${params.Key}`,
    };
  }
}
