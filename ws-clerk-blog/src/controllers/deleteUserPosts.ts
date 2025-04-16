import { type Request, type Response } from "express";
import { IPostRepository } from "../repositories/ipost-repository";
import { IClerkWeebhookService } from "../services/iclerk-webhook";

export class DeleteUserPostsControler {
  constructor(
    private postRepository: IPostRepository,
    private clerkWebhookService: IClerkWeebhookService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        type: eventType,
        data: { id },
      } = await this.clerkWebhookService.verify(req);

      if (eventType === "user.deleted") {
        await this.postRepository.deleteUserPosts(id);

        res.status(200).json({
          message: "Posts deletados com sucesso!",
        });
      }

      res.status(200).json({
        message: "Evento não tratado.",
      });
    } catch (err) {
      res.status(400).json({
        message: "Falha na verificação do webhook.",
        err,
      });
    }
  }
}
