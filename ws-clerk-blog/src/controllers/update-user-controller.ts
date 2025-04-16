import { Request, Response } from "express";
import { IUserRepository } from "../repositories/iuser-repository";
import { IClerkWeebhookService } from "../services/iclerk-webhook";
import { IUser } from "../models/user";

export class UpdateUserController {
  constructor(
    private userRepository: IUserRepository,
    private clerkWebhookService: IClerkWeebhookService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const {
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
        type: eventType,
      } = (await this.clerkWebhookService.verify(req)) as IUser;

      if (eventType === "user.updated") {
        await this.userRepository.update({
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

        res.status(200).json({
          message: "Usuário atualizado com sucesso!",
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
