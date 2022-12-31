export abstract class BucketRepository {
  abstract upload(blob: any): Promise<{ link: string }>;
}
