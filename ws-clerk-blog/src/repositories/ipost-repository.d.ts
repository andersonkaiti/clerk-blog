import { type IPost } from "../models/post.ts";
import { IUser } from "../models/user";

export interface IPostRepository {
  get(): Promise<IPost[]>;
  getByUserId(userId: string): Promise<IPost[]>;
  getById(id: string): Promise<IPost[] | null>;
  create(data: IPost): Promise<IPost>;
  update(data: IPost): Promise<IPost>;
  delete(id: string): Promise<void>;
}
