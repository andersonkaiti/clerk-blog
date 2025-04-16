import { IUser } from "../models/user";

export interface IUserRepository {
  create(user: IUser["data"]): Promise<void>;
  delete(id: string): Promise<void>;
}
