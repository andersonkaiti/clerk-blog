import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getAllPosts } from "@services/get-all-posts";
import { IPaginatedPosts } from "types/paginated-posts";

export function useGetAllPosts(filter: string) {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 4;

  return useSuspenseQuery({
    queryKey: ["home-posts", filter || "", page, limit],
    queryFn: getAllPosts,
    staleTime: 0,
    select: (posts: IPaginatedPosts) => ({
      ...posts,
      page,
    }),
  });
}
