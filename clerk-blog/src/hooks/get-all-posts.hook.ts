import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllPosts } from "@services/get-all-posts";

export function useGetAllPosts(filter: string) {
  return useSuspenseQuery({
    queryKey: ["home-posts", filter || ""],
    queryFn: getAllPosts,
    staleTime: 0,
  });
}
