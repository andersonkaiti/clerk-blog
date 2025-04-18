import { type Request, type Response } from "express";
import { IClerkWeebhookService } from "../services/iclerk-webhook";
import { IUserRepository } from "../repositories/iuser-repository";
import { IUserDeletedEvent } from "../models/iuser-deleted-event";

export class DeleteUserControler {
  constructor(
    private userRepository: IUserRepository,
    private clerkWebhookService: IClerkWeebhookService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const event = await this.clerkWebhookService.verify<IUserDeletedEvent>(
        req
      );

      if (!event) throw new Error("Falha na verificação do webhook.");

      const {
        type: eventType,
        data: { id },
      } = event;

      if (eventType === "user.deleted") {
        await this.userRepository.delete(id);

        res.status(200).json({
          message: "Posts e usuário deletados com sucesso!",
        });
      }

      res.status(200).json({
        message: "Evento não tratado.",
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({
          error: err.message,
        });
      }
    }
  }
}
