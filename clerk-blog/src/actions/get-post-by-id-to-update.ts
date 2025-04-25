"use server";

import { api } from "@adapters/index";
import { IPost } from "types/user-post";
import { validateUser } from "@validators/post";
import { BASE_URL } from "@config/index";

export async function getPostByIdToUpdate(postId: string) {
  const post = await api.get<IPost>({
    url: `${BASE_URL}/post/${postId}`,
  });

  await validateUser(post.userId);

  return post;
}
