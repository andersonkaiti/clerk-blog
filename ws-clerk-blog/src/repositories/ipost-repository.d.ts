import type { Posts } from "@prisma/client";
import type { IPost } from "../models/post.d.ts";

export interface IPostRepository {
  get(filter: string): Promise<Posts[]>;
  getByUserId(userId: string, filter: string): Promise<Posts[]>;
  getById(id: string): Promise<Posts[] | null>;
  create(data: IPost): Promise<Posts>;
  update(data: IPost): Promise<Posts>;
  delete(id: string): Promise<void>;
}
