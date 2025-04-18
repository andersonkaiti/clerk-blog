import { type Request, type Response } from "express";
import { IUserRepository } from "../repositories/iuser-repository";
import { IClerkWeebhookService } from "../services/iclerk-webhook";
import { IUserUpdatedEvent } from "../models/iuser-updated-event";

export class UpdateUserController {
  constructor(
    private userRepository: IUserRepository,
    private clerkWebhookService: IClerkWeebhookService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const event = await this.clerkWebhookService.verify<IUserUpdatedEvent>(
        req
      );

      if (!event) throw new Error("Falha na verificação do webhook.");

      const {
        data: { created_at, last_sign_in_at, updated_at, ...userData },
        type: eventType,
      } = event;

      if (eventType === "user.updated") {
        await this.userRepository.update({
          created_at: new Date(created_at),
          last_sign_in_at: new Date(last_sign_in_at),
          updated_at: new Date(updated_at),
          ...userData,
        });

        res.status(200).json({
          message: "Usuário atualizado com sucesso!",
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({
          error: err.message,
        });
      }
    }
  }
}
