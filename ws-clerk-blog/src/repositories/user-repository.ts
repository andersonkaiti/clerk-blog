import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "./iuser-repository";

export class UserRepository implements IUserRepository {
  constructor(private database: PrismaClient) {}

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
