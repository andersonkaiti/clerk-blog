import { type Request, type Response } from "express";
import { IClerkWeebhookService } from "../services/iclerk-webhook";
import { IUserRepository } from "../repositories/iuser-repository";
import { IUserCreatedEvent } from "../models/iuser-created-event";

export class CreateUserController {
  constructor(
    private userRepository: IUserRepository,
    private clerkWebhookService: IClerkWeebhookService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const event = await this.clerkWebhookService.verify<IUserCreatedEvent>(
        req
      );

      if (!event) throw new Error("Erro ao verificar webhook.");

      const {
        type: eventType,
        data: { created_at, updated_at, last_sign_in_at, ...userData },
      } = event;

      if (eventType === "user.created") {
        await this.userRepository.create({
          created_at: new Date(created_at),
          last_sign_in_at: new Date(created_at),
          updated_at: new Date(updated_at),
          ...userData,
        });

        res.status(201).json({
          message: "Usuário criado com sucesso!",
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
