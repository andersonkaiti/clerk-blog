import { User } from "./user";

export interface IUserPost {
  title: string;
  text: string;
  userId: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  user: User;
}
