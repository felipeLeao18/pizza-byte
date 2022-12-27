export abstract class Middleware {
  abstract use(req: any, res: any, next: () => void): void;
}
