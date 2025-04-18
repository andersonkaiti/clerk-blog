import { parseTime } from "@utils/parse-time";
import { DottedBackground } from "@components/dotted-background";
import { getPostByID } from "@actions/get-post-by-id";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await getPostByID(id);

  return (
    <DottedBackground>
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col items-center justify-center space-y-4 px-8">
        <h1
          className="text-2xl font-bold tracking-tight text-white"
          dangerouslySetInnerHTML={{
            __html: post.title.replace(/\n?\r/g, "<br />"),
          }}
        />
        <h1 className="text-xs text-gray-400">
          Publicado: {parseTime(post.createdAt)}
        </h1>
        <h1 className="text-xs text-gray-400">
          Última atualização: {parseTime(post.updatedAt)}
        </h1>

        <p
          dangerouslySetInnerHTML={{
            __html: post.text.replace(/\n?\r/g, "<br />"),
          }}
        />
      </div>
    </DottedBackground>
  );
}
