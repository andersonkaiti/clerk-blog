import { type Request, type Response } from "express";
import { IPostRepository } from "../repositories/ipost-repository";

export class DeletePostController {
  constructor(private postRepository: IPostRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this.postRepository.delete(id);

      res.status(200).json({
        message: "Post deletado.",
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
