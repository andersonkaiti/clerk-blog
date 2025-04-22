import { type Request, type Response } from "express";
import type { IPostRepository } from "../repositories/ipost-repository.d.ts";

export class GetPostsController {
  constructor(private postRepository: IPostRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { filter } = req.params;

      let posts = await this.postRepository.get(filter || "");

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
