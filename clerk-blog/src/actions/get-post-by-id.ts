"use server";

import { api } from "@adapters/index";
import { IPost } from "types/user-post";
import { BASE_URL } from "@config/index";

export async function getPostByID(id: string) {
  return (
    await api.get<IPost>({
      url: `${BASE_URL}/post/by-post-id/${id}`,
    })
  )[0];
}
