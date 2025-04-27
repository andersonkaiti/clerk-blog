import { database } from "../../../config/database.ts";
import { CreateUserController } from "../../controllers/create-user-controller.ts";
import { DeleteUserControler } from "../../controllers/delete-user.ts";
import { UpdateUserController } from "../../controllers/update-user-controller.ts";
import { UserRepository } from "../../repositories/user-repository.ts";
import { ClerkWeebhookServiceFactory } from "../services/clerk-webhook-service-factory.ts";

const userRepository = new UserRepository(database);

export function createUserFactory() {
  const { clerkWebhookService: clerkWebhookCreateUserService } =
    new ClerkWeebhookServiceFactory().createWebhook(
      process.env.CREATE_USER_SECRET!
    );

  const createUserController = new CreateUserController(
    userRepository,
    clerkWebhookCreateUserService
  );

  return {
    createUserController,
  };
}

export function updateUserFactory() {
  const { clerkWebhookService: clerkWebhookUpdateUserService } =
    new ClerkWeebhookServiceFactory().createWebhook(
      process.env.UPDATE_USER_SECRET!
    );

  const updateUserController = new UpdateUserController(
    userRepository,
    clerkWebhookUpdateUserService
  );

  return {
    updateUserController,
  };
}

export function deleteUserFactory() {
  const { clerkWebhookService: clerkWebhookDeleteUserService } =
    new ClerkWeebhookServiceFactory().createWebhook(
      process.env.DELETE_USER_SECRET!
    );

  const deleteUserPostsController = new DeleteUserControler(
    userRepository,
    clerkWebhookDeleteUserService
  );

  return {
    deleteUserPostsController,
  };
}
