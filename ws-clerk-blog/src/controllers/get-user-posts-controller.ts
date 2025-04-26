import { type Request, type Response } from "express";
import type { IPostRepository } from "../repositories/ipost-repository.d.ts";

export class GetUserPostsController {
  constructor(private postRepository: IPostRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { filter, page, limit } = req.query;
      const { userId } = req.params;

      const pageNumber = Number(page);
      const pageLimit = Number(limit);

      const skip = pageNumber * pageLimit - pageLimit;

      const posts = await this.postRepository.getByUserId({
        userId,
        filter: filter || "",
        skip,
        take: pageLimit,
      });

      const count = await this.postRepository.countByUserId({
        userId,
        filter: filter || "",
      });

      const last = Math.ceil(Number(count / pageLimit));

      const pagination = {
        first: 1,
        prev: pageNumber < 2 ? null : pageNumber - 1,
        page: pageNumber,
        next: pageNumber >= last ? null : pageNumber + 1,
        last,
        count,
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
