import { type Request, type Response } from "express";
import type { IPostRepository } from "../repositories/ipost-repository.d.ts";

export class GetUserPostsController {
  constructor(private postRepository: IPostRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { userId, filter } = req.params;

      let posts = await this.postRepository.getByUserId(userId);

      if (filter)
        posts = posts.filter(
          (post) =>
            post.title.toLowerCase().includes(filter.toLowerCase()) ||
            post.text.toLowerCase().includes(filter.toLowerCase())
        );

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
