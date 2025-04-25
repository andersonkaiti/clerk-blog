import { QueryFunctionContext } from "@tanstack/react-query";
import { api } from "@adapters/index";
import { IPaginatedPosts } from "types/paginated-posts";
import { BASE_URL } from "@config/index";

export async function getAllPosts({
  queryKey: [, filter, page, limit],
}: QueryFunctionContext) {
  const searchParams = new URLSearchParams({
    filter,
    page,
    limit,
  } as Record<string, string>);

  return (await api.get<IPaginatedPosts>({
    url: `${BASE_URL}/post?${searchParams}`,
  })) as IPaginatedPosts;
}
