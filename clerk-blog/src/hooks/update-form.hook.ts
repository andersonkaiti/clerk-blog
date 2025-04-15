import { getPostByIDToUpdate, IUserPost, updatePost } from "@actions/post";
import { useParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export function useUpdateForm() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState({} as IUserPost);

  useEffect(() => {
    getPostByIDToUpdate(id).then((res) => setPost(res));
  }, [id]);

  const [state, updatePostAction, pending] = useActionState(
    updatePost.bind(null, post.id),
    null,
  );

  return {
    post,
    state,
    updatePostAction,
    pending,
  };
}
