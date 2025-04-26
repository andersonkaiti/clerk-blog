"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { paginationFallback } from "@utils/pagination-fallback";
import { useSearchParams } from "next/navigation";
import { getAllPosts } from "@services/get-all-posts";
import { IPaginatedPosts } from "types/paginated-posts";

export function useGetAllPosts(filter: string) {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 4;

  const { data, ...rest } = useQuery({
    queryKey: ["home-posts", filter || "", page, limit],
    queryFn: getAllPosts,
    staleTime: 0,
    placeholderData: keepPreviousData,
    select: (posts: IPaginatedPosts) => ({
      ...posts,
      page,
    }),
  });

  const { data: posts, ...pagination } = data || paginationFallback;

  return {
    posts,
    pagination,
    ...rest,
  };
}
