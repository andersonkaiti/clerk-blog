import { User } from "./user";

export interface IPost {
  title: string;
  text: string;
  userId: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  user: User;
}
