import { PrismaClient } from "@prisma/client";
import { IUser } from "../models/user";
import { IUserRepository } from "./iuser-repository";

export class UserRepository implements IUserRepository {
  constructor(private database: PrismaClient) {}

  async create({ email_addresses, ...user }: IUser["data"]): Promise<void> {
    await this.database.users.create({
      data: {
        ...user,
        email_addresses: {
          create: email_addresses.map((email) => ({
            id: email.id,
            email_address: email.email_address,
            object: email.object,
          })),
        },
      },
    });
  }

  async update({ email_addresses, ...user }: IUser["data"]): Promise<void> {
    await this.database.users.update({
      where: {
        id: user.id,
      },
      data: {
        ...user,
        email_addresses: {
          deleteMany: {},
          create: email_addresses.map((email) => ({
            id: email.id,
            email_address: email.email_address,
            object: email.object,
          })),
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.database.users.delete({
      include: {
        email_addresses: true,
      },
      where: {
        id,
      },
    });
  }
}
