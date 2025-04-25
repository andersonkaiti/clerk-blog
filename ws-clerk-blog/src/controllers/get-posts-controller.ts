import { type Request, type Response } from "express";
import type { IPostRepository } from "../repositories/ipost-repository.d.ts";

export class GetPostsController {
  constructor(private postRepository: IPostRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { filter, page = 1, limit = 6 } = req.query;

      const pageNumber = Number(page);
      const pageLimit = Number(limit);

      const skip = pageNumber * pageLimit - pageLimit;

      const posts = await this.postRepository.get({
        filter: filter || "",
        skip,
        take: pageLimit,
      });

      const count = await this.postRepository.count();

      const last = Math.ceil(Number(count / pageLimit));

      const pagination = {
        first: 1,
        prev: pageNumber < 2 ? null : pageNumber - 1,
        next: pageNumber >= last ? null : pageNumber + 1,
        last,
        data: posts,
      };

      res.status(200).json(pagination);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({
          error: err.message,
        });
      }
    }
  }
}
