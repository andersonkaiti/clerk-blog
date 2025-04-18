import { UserRepository } from "../repositories/user-repository.ts";
import { database } from "../../config/database.ts";
import { ClerkWeebhookServiceFactory } from "./clerk-webhook-service-factory.ts";
import { CreateUserController } from "../controllers/create-user-controller.ts";
import { UpdateUserController } from "../controllers/update-user-controller.ts";
import { DeleteUserControler } from "../controllers/delete-user.ts";
import { config } from "dotenv";
config();

export class UserControllersFactory {
  createController() {
    const { clerkWebhookService: clerkWebhookCreateUserService } =
      new ClerkWeebhookServiceFactory().createWebhook(
        process.env.CREATE_USER_SECRET!
      );

    const { clerkWebhookService: clerkWebhookUpdateUserService } =
      new ClerkWeebhookServiceFactory().createWebhook(
        process.env.UPDATE_USER_SECRET!
      );

    const { clerkWebhookService: clerkWebhookDeleteUserService } =
      new ClerkWeebhookServiceFactory().createWebhook(
        process.env.DELETE_USER_SECRET!
      );

    const userRepository = new UserRepository(database);

    const createUserController = new CreateUserController(
      userRepository,
      clerkWebhookCreateUserService
    );

    const updateUserController = new UpdateUserController(
      userRepository,
      clerkWebhookUpdateUserService
    );

    const deleteUserPostsController = new DeleteUserControler(
      userRepository,
      clerkWebhookDeleteUserService
    );

    return {
      createUserController,
      updateUserController,
      deleteUserPostsController,
    };
  }
}
