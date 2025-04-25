import type { Posts } from "@prisma/client";
import type { IPost } from "../models/post.d.ts";
import type { IPaginatedPost } from "../models/paginated-post.d.ts";

export interface IPostRepository {
  get(props: IPaginatedPost): Promise<Posts[]>;
  getByUserId(props: IPaginatedPostByUserId): Promise<Posts[]>;
  getById(id: string): Promise<Posts | null>;
  create(data: IPost): Promise<Posts>;
  update(data: IPost): Promise<Posts>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
  countByUserId(userId: string): Promise<number>;
}
