export abstract class BucketRepository {
  abstract upload(blob: any): Promise<{ link: string }>;
  abstract getLink(blobId: string): Promise<{ link: string }>;
}
