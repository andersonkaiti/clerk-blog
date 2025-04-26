"use client";

import { startTransition, useOptimistic } from "react";
import { useAuth } from "@clerk/nextjs";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { paginationFallback } from "@utils/pagination-fallback";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { deletePost } from "@actions/delete-post";
import { getUserPosts } from "@services/get-user-posts";
import { IPaginatedPosts } from "types/paginated-posts";
import { IPost } from "types/user-post";

export function useUserPosts(filter: string) {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 7;

  const QUERY_KEY = [userId, filter || "", page, limit];

  const isUserIdAvailable = !!userId;

  const {
    data: result,
    isLoading: finallyLoading,
    ...rest
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getUserPosts,
    staleTime: 0,
    enabled: isUserIdAvailable,
    placeholderData: keepPreviousData,
    select: (posts: IPaginatedPosts) => ({
      ...posts,
      page,
    }),
  });

  const isLoading = !isUserIdAvailable || finallyLoading;

  const { data: posts, ...pagination } = result || paginationFallback;

  const [optimisticPosts, setOptimisticPosts] = useOptimistic(
    posts || [],
    (currentPosts: IPost[], postId: string) =>
      currentPosts.filter((post) => post.id !== postId),
  );

  async function handleDeletePost(post: IPost) {
    startTransition(() => {
      setOptimisticPosts(post.id);
    });

    await deletePost(post.userId, post.id);

    queryClient.invalidateQueries({
      queryKey: QUERY_KEY,
    });

    toast.success("Post deletado com sucesso!");
  }

  return {
    optimisticPosts,
    handleDeletePost,
    pagination,
    isLoading,
    ...rest,
  };
}
