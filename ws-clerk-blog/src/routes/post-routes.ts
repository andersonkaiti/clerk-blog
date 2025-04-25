import { Router } from "express";
import { PostsControllersFactory } from "../factories/posts-controllers-factory.ts";

const {
  createPostController,
  deletePostController,
  getPostsController,
  getPostByIdController,
  getUserPostsController,
  updatePostController,
} = new PostsControllersFactory().createControllers();

const router = Router();

router.post("/", createPostController.handle.bind(createPostController));

router.put("/", updatePostController.handle.bind(updatePostController));

router.delete("/:id", deletePostController.handle.bind(deletePostController));

router.get("/", getPostsController.handle.bind(getPostsController));

router.get(
  "/:userId/posts",
  getUserPostsController.handle.bind(getUserPostsController)
);

router.get(
  "/:postId",
  getPostByIdController.handle.bind(getPostByIdController)
);

export { router as postRoutes };
