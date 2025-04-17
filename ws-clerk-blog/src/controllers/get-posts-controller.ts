import { type Request, type Response } from "express";
import { IPostRepository } from "../repositories/ipost-repository";

export class GetPostsController {
  constructor(private postRepository: IPostRepository) {}

  async handle(_req: Request, res: Response) {
    try {
      const posts = await this.postRepository.get();

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
