"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createPost } from "@actions/create-post";

export function useCreatePost() {
  const [state, createPostAction, pending] = useActionState(createPost, null);

  const router = useRouter();

  useEffect(() => {
    if (state && "success" in state) {
      toast.success("Post cadastrado com sucesso!");
      router.push("/dashboard");
    }
  }, [router, state]);

  return {
    state,
    createPostAction,
    pending,
  };
}
