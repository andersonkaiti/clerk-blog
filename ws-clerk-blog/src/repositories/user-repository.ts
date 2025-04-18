import { PrismaClient } from "@prisma/client";
import type { IUserRepository } from "./iuser-repository.d.ts";
import type { IUser as IUserCreated } from "../models/iuser-created-event.d.ts";
import type { IUser as IUserUpdated } from "../models/iuser-updated-event.d.ts";

export class UserRepository implements IUserRepository {
  constructor(private database: PrismaClient) {}

  async create({
    email_addresses,
    created_at,
    first_name,
    image_url,
    last_name,
    last_sign_in_at,
    profile_image_url,
    updated_at,
    id,
  }: IUserCreated): Promise<void> {
    await this.database.users.create({
      data: {
        created_at,
        first_name,
        image_url,
        last_name,
        last_sign_in_at,
        profile_image_url,
        updated_at,
        id,
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

  async update({
    email_addresses,
    created_at,
    first_name,
    image_url,
    last_name,
    last_sign_in_at,
    profile_image_url,
    updated_at,
    username,
    id,
  }: IUserUpdated): Promise<void> {
    await this.database.users.update({
      where: {
        id,
      },
      data: {
        created_at,
        first_name,
        image_url,
        last_name,
        last_sign_in_at,
        profile_image_url,
        updated_at,
        username,
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
