import { getPostByIDToUpdate } from "@actions/get-post-by-id-to-update";
import { UpdateForm } from "./update-post-form";

export interface IUpdatePageProps {
  params: Promise<{ id: string }>;
}

export default async function UpdatePage({ params }: IUpdatePageProps) {
  const { id } = await params;

  const post = await getPostByIDToUpdate(id);

  return <UpdateForm post={post} />;
}
