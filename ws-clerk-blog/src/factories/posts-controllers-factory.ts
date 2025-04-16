import { PostRepository } from "../repositories/post-repository.ts";
import { UserRepository } from "../repositories/user-repository.ts";
import { ClerkWeebhookServiceFactory } from "./clerk-webhook-service-factory.ts";
import { database } from "../../config/database.ts";
import { CreatePostController } from "../controllers/create-post-controller.ts";
import { GetUserPostsController } from "../controllers/get-user-posts-controller.ts";
import { GetPostsController } from "../controllers/get-posts-controller.ts";
import { GetPostByIdController } from "../controllers/get-post-by-id-controller.ts";
import { UpdatePostController } from "../controllers/update-post-controller.ts";
import { DeletePostController } from "../controllers/delete-post-controller.ts";
import { config } from "dotenv";
config();

export class PostsControllersFactory {
  createControllers() {
    // Dependências
    const postRepository = new PostRepository(database);

    // Controllers
    const createPostController = new CreatePostController(postRepository);
    const getPostsController = new GetPostsController(postRepository);
    const getUserPostsController = new GetUserPostsController(postRepository);
    const getPostByIDController = new GetPostByIdController(postRepository);
    const updatePostController = new UpdatePostController(postRepository);
    const deletePostController = new DeletePostController(postRepository);

    return {
      createPostController,
      getPostsController,
      getUserPostsController,
      getPostByIDController,
      updatePostController,
      deletePostController,
    };
  }
}
