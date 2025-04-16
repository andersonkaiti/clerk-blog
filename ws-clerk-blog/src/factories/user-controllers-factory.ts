import { UserRepository } from "../repositories/user-repository";
import { database } from "../../config/database";
import { ClerkWeebhookServiceFactory } from "./clerk-webhook-service-factory";
import { CreateUserController } from "../controllers/create-user-controller";
import { DeleteUserControler } from "../controllers/delete-user";
import { config } from "dotenv";
config();

export class UserControllersFactory {
  createController() {
    const { clerkWebhookService: clerkWebhookCreateUserService } =
      new ClerkWeebhookServiceFactory().createWebhook(
        process.env.CREATE_USER_SECRET!
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

    const deleteUserPostsController = new DeleteUserControler(
      userRepository,
      clerkWebhookDeleteUserService
    );

    return {
      createUserController,
      deleteUserPostsController,
    };
  }
}
