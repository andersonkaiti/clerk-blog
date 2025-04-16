import { Router } from "express";
import {
  createPostController,
  deletePostController,
  deleteUserPostsController,
  getPostByIDController,
  getPostsController,
  getUserPostsController,
  updatePostController,
} from "../di/posts.ts";

const router = Router();

router.post("/", createPostController.handle.bind(createPostController));

router.put("/", updatePostController.handle.bind(updatePostController));

router.delete("/:id", deletePostController.handle.bind(deletePostController));

router.get("/", getPostsController.handle.bind(getPostsController));

router.get(
  "/by-user-id/:userId",
  getUserPostsController.handle.bind(getUserPostsController)
);

router.get(
  "/by-post-id/:id",
  getPostByIDController.handle.bind(getPostByIDController)
);

router.post(
  "/api/webhooks",
  deleteUserPostsController.handle.bind(deleteUserPostsController)
);

export { router as postRoutes };
