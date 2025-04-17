import { type Request, type Response } from "express";
import { IClerkWeebhookService } from "../services/iclerk-webhook";
import { IUserRepository } from "../repositories/iuser-repository";

export class DeleteUserControler {
  constructor(
    private userRepository: IUserRepository,
    private clerkWebhookService: IClerkWeebhookService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        type: eventType,
        data: { id },
      } = await this.clerkWebhookService.verify(req);

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
          message: "Falha na verificação do webhook.",
          error: err.message,
        });
      }
    }
  }
}
