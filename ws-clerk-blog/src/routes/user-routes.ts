import { Router } from "express";
import { UserControllersFactory } from "../factories/user-controllers-factory";

const router = Router();

const {
  createUserController,
  updateUserController,
  deleteUserPostsController,
} = new UserControllersFactory().createController();

router.post(
  "/api/webhooks/created-user",
  createUserController.handle.bind(createUserController)
);

router.post(
  "/api/webhooks/updated-user",
  updateUserController.handle.bind(updateUserController)
);

router.post(
  "/api/webhooks/deleted-user",
  deleteUserPostsController.handle.bind(deleteUserPostsController)
);

export { router as userRoutes };
