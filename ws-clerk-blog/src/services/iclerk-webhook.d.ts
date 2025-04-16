import { Request } from "express";

export interface IClerkWeebhookService {
  verify<T>(req: Request): Promise<R>;
}
