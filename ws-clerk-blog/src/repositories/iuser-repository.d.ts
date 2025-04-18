import { IUser as IUserCreated } from "../models/iuser-created-event";
import { IUser as IUserUpdated } from "../models/iuser-updated-event";

export interface IUserRepository {
  create(user: IUserCreated): Promise<void>;
  update(user: IUserUpdated): Promise<void>;
  delete(id: string): Promise<void>;
}
