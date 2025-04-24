"use client";

import { startTransition, useOptimistic } from "react";
import { useAuth } from "@clerk/nextjs";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { deletePost } from "@actions/delete-post";
import { getUserPosts } from "@services/get-user-posts";
import { IPost } from "types/user-post";

export function useGetUserPosts(filter: string) {
  const { userId } = useAuth();

  const queryClient = useQueryClient();

  const QUERY_KEY = [userId, filter || ""];

  const { data: posts, ...rest } = useSuspenseQuery({
    queryKey: QUERY_KEY,
    queryFn: getUserPosts,
    staleTime: 0,
  });

  const [optimisticPosts, setOptimisticPosts] = useOptimistic(
    posts,
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
    ...rest,
  };
}
