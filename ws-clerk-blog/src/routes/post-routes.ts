import { Router } from "express";
import { PostsControllersFactory } from "../factories/posts-controllers-factory.ts";

const {
  createPostController,
  deletePostController,
  getPostByIDController,
  getPostsController,
  getUserPostsController,
  updatePostController,
} = new PostsControllersFactory().createControllers();

const router = Router();

router.post("/", createPostController.handle.bind(createPostController));

router.put("/", updatePostController.handle.bind(updatePostController));

router.delete("/:id", deletePostController.handle.bind(deletePostController));

router.get("/", getPostsController.handle.bind(getPostsController));

router.get("/:filter", getPostsController.handle.bind(getPostsController));

router.get(
  "/by-user-id/:userId",
  getUserPostsController.handle.bind(getUserPostsController)
);

router.get(
  "/by-user-id/:userId/:filter",
  getUserPostsController.handle.bind(getUserPostsController)
);

router.get(
  "/by-post-id/:id",
  getPostByIDController.handle.bind(getPostByIDController)
);

export { router as postRoutes };
