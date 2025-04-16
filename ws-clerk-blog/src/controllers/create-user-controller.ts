import { type Request, type Response } from "express";
import { IClerkWeebhookService } from "../services/iclerk-webhook";
import { IUser } from "../models/user";
import { IUserRepository } from "../repositories/iuser-repository";

export class CreateUserController {
  constructor(
    private userRepository: IUserRepository,
    private clerkWebhookService: IClerkWeebhookService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        type: eventType,
        data: {
          created_at,
          last_sign_in_at,
          updated_at,
          email_addresses,
          id,
          first_name,
          image_url,
          last_name,
          profile_image_url,
          username,
        },
      } = (await this.clerkWebhookService.verify(req)) as IUser;

      if (eventType === "user.created") {
        await this.userRepository.create({
          created_at: new Date(created_at),
          last_sign_in_at: new Date(last_sign_in_at),
          updated_at: new Date(updated_at),
          email_addresses,
          id,
          first_name,
          image_url,
          last_name,
          profile_image_url,
          username,
        });

        res.status(201).json({
          message: "Usuário criado com sucesso!",
        });
      }
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
