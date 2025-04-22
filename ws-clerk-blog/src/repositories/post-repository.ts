import { PrismaClient } from "@prisma/client";
import type { IPostRepository } from "./ipost-repository.d.ts";
import type { IPost } from "../models/post.d.ts";
import type { Posts } from "@prisma/client";

export class PostRepository implements IPostRepository {
  constructor(private database: PrismaClient) {}

  async get(filter: string): Promise<Posts[]> {
    return await this.database.posts.findMany({
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

  async getByUserId(userId: string, filter: string): Promise<Posts[]> {
    return await this.database.posts.findMany({
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

  async getById(id: string): Promise<Posts[] | null> {
    return await this.database.posts.findMany({
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
}
