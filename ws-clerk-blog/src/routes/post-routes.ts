import { Router, type Request, type Response } from "express";
import {
  createPostFactory,
  deletePostFactory,
  getPostsFactory,
  postByIdFactory,
  updatePostFactory,
  userPostsFactory,
} from "../factories/controllers/posts-factories.ts";

const { createPostController } = createPostFactory();
const { updatePostController } = updatePostFactory();
const { deletePostController } = deletePostFactory();
const { getPostsController } = getPostsFactory();
const { getUserPostsController } = userPostsFactory();
const { getPostByIdController } = postByIdFactory();

const router = Router();

router.post("/", (req: Request, res: Response) => {
  createPostController.handle(req, res);
});

router.put("/", (req: Request, res: Response) => {
  updatePostController.handle(req, res);
});

router.delete("/:id", (req: Request, res: Response) => {
  deletePostController.handle(req, res);
});

router.get("/", (req: Request, res: Response) => {
  getPostsController.handle(req, res);
});

router.get("/:userId/posts", (req: Request, res: Response) => {
  getUserPostsController.handle(req, res);
});

router.get("/:postId", (req: Request, res: Response) => {
  getPostByIdController.handle(req, res);
});

export { router as postRoutes };
