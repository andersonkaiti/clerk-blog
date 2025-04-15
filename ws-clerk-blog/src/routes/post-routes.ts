import { type Request, type Response, Router } from "express";
import { PostRepository } from "../repositories/post-repository.ts";
import { database } from "../../config/database.ts";
import { CreatePostController } from "../controllers/create-post-controller.ts";
import { GetUserPostsController } from "../controllers/get-user-posts-controller.ts";
import { GetPostsController } from "../controllers/get-posts-controller.ts";
import { GetPostByIdController } from "../controllers/get-post-by-id-controller.ts";
import { UpdatePostController } from "../controllers/update-post-controller.ts";
import { DeletePostController } from "../controllers/delete-post-controller.ts";

const router = Router();

const postRepository = new PostRepository(database);

const createPostController = new CreatePostController(postRepository);
const getPostsController = new GetPostsController(postRepository);
const getUserPostsController = new GetUserPostsController(postRepository);
const getPostByIDController = new GetPostByIdController(postRepository);
const updatePostController = new UpdatePostController(postRepository);
const deletePostController = new DeletePostController(postRepository);

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

router.get("/by-user-id/:userId", (req: Request, res: Response) => {
  getUserPostsController.handle(req, res);
});

router.get("/by-post-id/:id", (req: Request, res: Response) => {
  getPostByIDController.handle(req, res);
});

export { router as postRoutes };
