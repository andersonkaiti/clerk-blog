import { database } from "../../../config/database.ts";
import { PostRepository } from "../../repositories/post-repository.ts";
import { CreatePostController } from "../../controllers/create-post-controller.ts";
import { UpdatePostController } from "../../controllers/update-post-controller.ts";
import { GetPostsController } from "../../controllers/get-posts-controller.ts";
import { DeletePostController } from "../../controllers/delete-post-controller.ts";
import { GetUserPostsController } from "../../controllers/get-user-posts-controller.ts";
import { GetPostByIdController } from "../../controllers/get-post-by-id-controller.ts";

const postRepository = new PostRepository(database);

export function createPostFactory() {
  const createPostController = new CreatePostController(postRepository);

  return {
    createPostController,
  };
}

export function updatePostFactory() {
  const updatePostController = new UpdatePostController(postRepository);

  return {
    updatePostController,
  };
}

export function getPostsFactory() {
  const getPostsController = new GetPostsController(postRepository);

  return {
    getPostsController,
  };
}

export function deletePostFactory() {
  const deletePostController = new DeletePostController(postRepository);

  return {
    deletePostController,
  };
}

export function userPostsFactory() {
  const getUserPostsController = new GetUserPostsController(postRepository);

  return {
    getUserPostsController,
  };
}

export function postByIdFactory() {
  const getPostByIdController = new GetPostByIdController(postRepository);

  return {
    getPostByIdController,
  };
}
