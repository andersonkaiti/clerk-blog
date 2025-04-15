import { getPostByID } from "@actions/post";
import { parseTime } from "@utils/parse-time";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await getPostByID(id);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold tracking-tight text-white">
        {post.title}
      </h1>
      <h1 className="text-xs text-gray-400">
        Publicado: {parseTime(post.createdAt)}
      </h1>
      <h1 className="text-xs text-gray-400">
        Última atualização: {parseTime(post.updatedAt)}
      </h1>

      <h1>{post.text}</h1>
    </div>
  );
}
