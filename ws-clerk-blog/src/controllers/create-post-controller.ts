import { type Request, type Response } from "express";
import { IPostRepository } from "../repositories/ipost-repository";

export class CreatePostController {
  constructor(private postRepository: IPostRepository) {}

  async handle(req: Request, res: Response) {
    const post = this.postRepository.create(req.body);

    res.status(201).json(post);
  }
}
