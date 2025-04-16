import { type Request, type Response } from "express";
import { IPostRepository } from "../repositories/ipost-repository";

export class GetPostByIdController {
  constructor(private postRepository: IPostRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const post = await this.postRepository.getById(id);

      res.status(200).json(post);
    } catch (err) {
      res.status(400).json({
        err,
      });
    }
  }
}
