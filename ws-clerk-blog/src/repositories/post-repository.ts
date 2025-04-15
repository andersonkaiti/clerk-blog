import { PrismaClient } from "@prisma/client";
import { IPostRepository } from "./ipost-repository";
import { IPost } from "../models/post";

export class PostRepository implements IPostRepository {
  constructor(private database: PrismaClient) {}

  async get(): Promise<IPost[]> {
    return await this.database.posts.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
      where: {
        deleted: false,
      },
    });
  }

  async getByUserId(userId: string): Promise<IPost[]> {
    return await this.database.posts.findMany({
      where: {
        userId,
        deleted: false,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  }

  async getById(id: string): Promise<IPost[] | null> {
    return await this.database.posts.findMany({
      where: {
        id,
        deleted: false,
      },
    });
  }

  async create(data: IPost): Promise<IPost> {
    return await this.database.posts.create({
      data,
    });
  }

  async update(data: IPost): Promise<IPost> {
    const { id, ...updatedData } = data;

    return await this.database.posts.update({
      data: updatedData,
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
