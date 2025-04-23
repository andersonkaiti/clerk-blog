import { QueryFunctionContext } from "@tanstack/react-query";
import { api } from "@adapters/index";
import { IPost } from "types/user-post";
import { BASE_URL } from "@config/index";

export async function getUserPosts({
  queryKey: [userId, filter],
}: QueryFunctionContext) {
  return api.get<IPost>({
    url: `${BASE_URL}/post/by-user-id/${userId}/${filter}`,
  });
}
