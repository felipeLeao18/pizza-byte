export type Blob = {
  originalname: string;
  mimetype: string;
  buffer: any;
};
export abstract class BucketRepository {
  abstract upload(blob: Blob): Promise<{ link: string }>;
}
