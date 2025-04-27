import { Router, type Request, type Response } from "express";
import {
  createUserFactory,
  deleteUserFactory,
  updateUserFactory,
} from "../factories/controllers/users-factories.ts";

const router = Router();

const { createUserController } = createUserFactory();
const { updateUserController } = updateUserFactory();
const { deleteUserPostsController } = deleteUserFactory();

router.post("/api/webhooks/created-user", (req: Request, res: Response) => {
  createUserController.handle(req, res);
});

router.post("/api/webhooks/updated-user", (req: Request, res: Response) => {
  updateUserController.handle(req, res);
});

router.post("/api/webhooks/deleted-user", (req: Request, res: Response) => {
  deleteUserPostsController.handle(req, res);
});

export { router as userRoutes };
