import { type Request } from "express";
import { Webhook } from "svix";
import {
  type IClerkWeebhookService,
  type IClerkWeebhookServiceReturn,
} from "./iclerk-webhook";

export class ClerkWeebhookService implements IClerkWeebhookService {
  constructor(private webhook: Webhook) {}

  async verify(req: Request): Promise<IClerkWeebhookServiceReturn> {
    const {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    } = req.headers;

    if (!svix_id || !svix_timestamp || !svix_signature) {
      throw new Error("Headers svix ausentes.");
    }

    const payload = JSON.stringify(req.body);
    const headers = {
      "svix-id": svix_id as string,
      "svix-timestamp": svix_timestamp as string,
      "svix-signature": svix_signature as string,
    };

    try {
      return this.webhook.verify(
        payload,
        headers
      ) as IClerkWeebhookServiceReturn;
    } catch (err) {
      throw new Error("Falha na verificação do webhook.");
    }
  }
}
