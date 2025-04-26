import { PrismaClient } from "@prisma/client";
import type { IPostRepository } from "./ipost-repository.d.ts";
import type { IPost } from "../models/post.d.ts";
import type { Posts } from "@prisma/client";
import {
  ICountByUserId,
  IPaginatedPost,
  IPaginatedPostByUserId,
} from "../models/paginated-post.js";

export class PostRepository implements IPostRepository {
  constructor(private database: PrismaClient) {}

  async get({ filter, skip, take }: IPaginatedPost): Promise<Posts[]> {
    return await this.database.posts.findMany({
      skip,
      take,
      orderBy: [
        {
          updatedAt: "desc",
        },
      ],
      where: {
        deleted: false,
        OR: [
          {
            title: {
              contains: filter,
            },
          },
          {
            text: {
              contains: filter,
            },
          },
        ],
      },
      include: {
        user: {
          include: {
            email_addresses: true,
          },
        },
      },
    });
  }

  async getByUserId({
    userId,
    filter,
    skip,
    take,
  }: IPaginatedPostByUserId): Promise<Posts[]> {
    return await this.database.posts.findMany({
      skip,
      take,
      where: {
        userId,
        deleted: false,
        OR: [
          {
            title: {
              contains: filter,
            },
          },
          {
            text: {
              contains: filter,
            },
          },
        ],
      },
      orderBy: [
        {
          updatedAt: "desc",
        },
      ],
    });
  }

  async getById(id: string): Promise<Posts | null> {
    return await this.database.posts.findFirst({
      where: {
        id,
        deleted: false,
      },
      include: {
        user: true,
      },
    });
  }

  async create(data: IPost): Promise<Posts> {
    return await this.database.posts.create({
      data,
    });
  }

  async update({ id, ...data }: IPost): Promise<Posts> {
    return await this.database.posts.update({
      data,
      where: {
        id,
        deleted: false,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.database.posts.update({
      data: {
        deleted: true,
      },
      where: {
        id,
      },
    });
  }

  async count(filter: string): Promise<number> {
    return await this.database.posts.count({
      where: {
        deleted: false,
        OR: [
          {
            title: {
              contains: filter,
            },
          },
          {
            text: {
              contains: filter,
            },
          },
        ],
      },
    });
  }

  async countByUserId({ userId, filter }: ICountByUserId): Promise<number> {
    return await this.database.posts.count({
      where: {
        deleted: false,
        userId,
        OR: [
          {
            title: {
              contains: filter,
            },
          },
          {
            text: {
              contains: filter,
            },
          },
        ],
      },
    });
  }
}
