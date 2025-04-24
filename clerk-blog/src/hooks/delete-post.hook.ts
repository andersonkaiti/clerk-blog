"use client";

import { useState } from "react";
import { toast } from "sonner";
import { deletePost } from "@actions/delete-post";
import { IPost } from "types/user-post";

export function useDeleteDialog(post: IPost) {
  const [opened, setOpened] = useState(false);

  async function handleDelete() {
    try {
      await deletePost(post.userId, post.id);
      toast.success("Post deletado com sucesso!");
      setOpened(false);
      window.location.reload();
    } catch {
      toast.error("Erro ao deletar o post.");
    }
  }

  return {
    opened,
    setOpened,
    handleDelete,
  };
}
