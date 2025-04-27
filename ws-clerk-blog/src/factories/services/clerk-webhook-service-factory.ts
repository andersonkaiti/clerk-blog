import { ClerkWeebhookService } from "../../services/clerk-webhook.ts";
import { Webhook } from "svix";

export class ClerkWeebhookServiceFactory {
  createWebhook(secret: string) {
    return {
      clerkWebhookService: new ClerkWeebhookService(new Webhook(secret)),
    };
  }
}
