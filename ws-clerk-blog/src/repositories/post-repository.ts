import { PrismaClient } from "@prisma/client";
import type { IPostRepository } from "./ipost-repository.d.ts";
import type { IPost } from "../models/post.d.ts";
import type { ITransformedPosts } from "../models/itransformed-post.d.ts";
import { transformPost } from "../utils/transform-post.ts";

export class PostRepository implements IPostRepository {
  constructor(private database: PrismaClient) {}

  async get(): Promise<ITransformedPosts[]> {
    const posts = await this.database.posts.findMany({
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
      include: {
        user: {
          include: {
            email_addresses: true,
          },
        },
      },
    });

    return transformPost(posts);
  }

  async getByUserId(userId: string): Promise<ITransformedPosts[]> {
    const posts = await this.database.posts.findMany({
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

    return transformPost(posts);
  }

  async getById(id: string): Promise<ITransformedPosts[] | null> {
    const posts = await this.database.posts.findMany({
      where: {
        id,
        deleted: false,
      },
      include: {
        user: true,
      },
    });

    return transformPost(posts);
  }

  async create({ userId, text, title }: IPost): Promise<ITransformedPosts> {
    const post = await this.database.posts.create({
      data: {
        userId,
        title: Buffer.from(title, "utf-8"),
        text: Buffer.from(text, "utf-8"),
      },
    });

    return transformPost(post);
  }

  async update({ id, title, text }: IPost): Promise<ITransformedPosts> {
    const post = await this.database.posts.update({
      data: {
        title: Buffer.from(title, "utf-8"),
        text: Buffer.from(text, "utf-8"),
      },
      where: {
        id,
        deleted: false,
      },
    });

    return transformPost(post);
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
