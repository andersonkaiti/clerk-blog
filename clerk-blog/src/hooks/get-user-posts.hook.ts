"use client";

import { useAuth } from "@clerk/nextjs";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserPosts } from "@services/get-user-posts";

export function useGetUserPosts(filter: string) {
  const { userId } = useAuth();

  return useSuspenseQuery({
    queryKey: [userId, filter || ""],
    queryFn: getUserPosts,
    staleTime: 0,
  });
}
