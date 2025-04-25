import { QueryFunctionContext } from "@tanstack/react-query";
import { api } from "@adapters/index";
import { IPaginatedPosts } from "types/paginated-posts";
import { BASE_URL } from "@config/index";

export async function getUserPosts({
  queryKey: [userId, filter, page, limit],
}: QueryFunctionContext) {
  const searchParams = new URLSearchParams({
    userId,
    filter,
    page,
    limit,
  } as Record<string, string>);

  return api.get<IPaginatedPosts>({
    url: `${BASE_URL}/post/${userId}/posts?${searchParams}`,
  });
}
