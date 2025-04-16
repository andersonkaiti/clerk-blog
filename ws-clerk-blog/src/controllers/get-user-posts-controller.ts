import { type Request, type Response } from "express";
import { IPostRepository } from "../repositories/ipost-repository";

export class GetUserPostsController {
  constructor(private postRepository: IPostRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const posts = await this.postRepository.getByUserId(userId);

      res.status(200).json(posts);
    } catch (err) {
      res.status(400).json({
        err,
      });
    }
  }
}
