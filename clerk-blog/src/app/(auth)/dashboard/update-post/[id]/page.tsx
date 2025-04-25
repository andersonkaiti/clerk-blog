import { getPostByIdToUpdate } from "@actions/get-post-by-id-to-update";
import { UpdateForm } from "./update-post-form";

export interface IUpdatePageProps {
  params: Promise<{ id: string }>;
}

export default async function UpdatePage({ params }: IUpdatePageProps) {
  const { id } = await params;

  const post = await getPostByIdToUpdate(id);

  return <UpdateForm post={post} />;
}
