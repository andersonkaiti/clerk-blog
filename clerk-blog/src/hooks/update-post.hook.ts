import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updatePost } from "@actions/update-post";

export function useUpdatePost(id: string) {
  const [state, updatePostAction, pending] = useActionState(
    updatePost.bind(null, id),
    null,
  );

  const router = useRouter();

  useEffect(() => {
    if (state && "success" in state) {
      toast("Post atualizado com sucesso!");
      router.push("/dashboard");
      router.refresh();
    }
  }, [router, state]);

  return {
    state,
    updatePostAction,
    pending,
  };
}
