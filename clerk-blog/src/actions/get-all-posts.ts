"use server";

import { api } from "@adapters/index";
import { IPost } from "types/user-post";
import { BASE_URL } from "@config/index";

export async function getAllPosts(filter: string) {
  return await api.get<IPost>({
    url: `${BASE_URL}/post/${filter}`,
  });
}
