import type { IPost } from "../models/post.d.ts";
import type { ITransformedPosts } from "../models/itransformed-post.d.ts";

export interface IPostRepository {
  get(): Promise<ITransformedPosts[]>;
  getByUserId(userId: string): Promise<ITransformedPosts[]>;
  getById(id: string): Promise<ITransformedPosts[] | null>;
  create(data: IPost): Promise<ITransformedPosts>;
  update(data: IPost): Promise<ITransformedPosts>;
  delete(id: string): Promise<void>;
}
