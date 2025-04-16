import { Request } from "express";

export interface IClerkWeebhookServiceReturn {
  type: string;
  data: { id: string };
}

export interface IClerkWeebhookService {
  verify(req: Request): Promise<IClerkWeebhookReturn>;
}
