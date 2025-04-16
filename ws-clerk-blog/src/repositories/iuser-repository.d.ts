import { IUser } from "../models/user";

export interface IUserRepository {
  delete(id: string): Promise<void>;
}
