import { type Request, type Response } from "express";
import { IPostRepository } from "../repositories/ipost-repository";

export class UpdatePostController {
  constructor(private postRepository: IPostRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const post = this.postRepository.update(req.body);

      res.status(200).json(post);
    } catch (err) {
      res.status(400).json({
        err,
      });
    }
  }
}
