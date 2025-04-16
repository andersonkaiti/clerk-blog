import { PostRepository } from "../repositories/post-repository.ts";
import { database } from "../../config/database.ts";
import { CreatePostController } from "../controllers/create-post-controller.ts";
import { GetUserPostsController } from "../controllers/get-user-posts-controller.ts";
import { GetPostsController } from "../controllers/get-posts-controller.ts";
import { GetPostByIdController } from "../controllers/get-post-by-id-controller.ts";
import { UpdatePostController } from "../controllers/update-post-controller.ts";
import { DeletePostController } from "../controllers/delete-post-controller.ts";
import { DeleteUserPostsControler } from "../controllers/deleteUserPosts.ts";
import { ClerkWeebhookService } from "../services/clerk-webhook.ts";
import { Webhook } from "svix";
import { config } from "dotenv";
config();

// Dependências
const postRepository = new PostRepository(database);
const clerkWebhookService = new ClerkWeebhookService(
  new Webhook(process.env.CLERK_WEBHOOK_SIGNING_SECRET!)
);

// Controllers
export const createPostController = new CreatePostController(postRepository);
export const getPostsController = new GetPostsController(postRepository);
export const getUserPostsController = new GetUserPostsController(
  postRepository
);
export const getPostByIDController = new GetPostByIdController(postRepository);
export const updatePostController = new UpdatePostController(postRepository);
export const deletePostController = new DeletePostController(postRepository);
export const deleteUserPostsController = new DeleteUserPostsControler(
  postRepository,
  clerkWebhookService
);
