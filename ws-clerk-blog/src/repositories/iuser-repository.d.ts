import type { IUser as IUserCreated } from "../models/iuser-created-event.d.ts";
import type { IUser as IUserUpdated } from "../models/iuser-updated-event.d.ts";

export interface IUserRepository {
  create(user: IUserCreated): Promise<void>;
  update(user: IUserUpdated): Promise<void>;
  delete(id: string): Promise<void>;
}
