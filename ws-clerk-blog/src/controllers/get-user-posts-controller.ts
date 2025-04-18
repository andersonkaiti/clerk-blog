import { type Request, type Response } from "express";
import type { IPostRepository } from "../repositories/ipost-repository.d.ts";

export class GetUserPostsController {
  constructor(private postRepository: IPostRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const posts = await this.postRepository.getByUserId(userId);

      res.status(200).json(posts);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({
          error: err.message,
        });
      }
    }
  }
}
