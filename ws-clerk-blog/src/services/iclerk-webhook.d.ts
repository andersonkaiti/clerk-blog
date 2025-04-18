import type { Request } from "express";

export interface IClerkWeebhookService {
  verify<T>(req: Request): Promise<T | undefined>;
}
