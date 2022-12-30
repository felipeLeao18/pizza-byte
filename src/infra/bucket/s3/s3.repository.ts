/* eslint-disable @typescript-eslint/no-empty-function */
import { BucketRepository } from '@app/repositories/bucket-repository';
import { Injectable } from '@nestjs/common';
import { config } from 'src/env';

@Injectable()
export class S3Repository implements BucketRepository {
  constructor() {}
  async upload(blob: any): Promise<{ link: string }> {
    throw new Error('Method not implemented.');
  }
  async getLink(blobId: string): Promise<{ link: string }> {
    throw new Error('Method not implemented.');
  }
}
