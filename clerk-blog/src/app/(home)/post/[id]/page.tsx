import { parseTime } from "@utils/parse-time";
import Image from "next/image";
import { BackButton } from "@components/back-button";
import { DottedBackground } from "@components/dotted-background";
import { getPostByID } from "@actions/get-post-by-id";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { title, text, updatedAt, user } = await getPostByID(id);

  return (
    <DottedBackground>
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col items-center justify-center space-y-8 p-8">
        <BackButton />
        <div className="w-full space-y-8">
          <h1 className="text-xs font-semibold text-gray-400">
            Última atualização: {parseTime(updatedAt)}
          </h1>

          <h1
            className="text-5xl font-semibold tracking-tight text-white"
            dangerouslySetInnerHTML={{
              __html: title.replace(/\n?\r/g, "<br />"),
            }}
          />

          <div className="space-y-2 border-b border-b-neutral-700 pb-8">
            <h1 className="text-xs text-gray-400">Publicado por</h1>
            <div className="flex items-center gap-1">
              <div className="relative h-6 w-6 overflow-hidden rounded-full">
                <Image
                  src={user.image_url}
                  alt={user.id}
                  width={24}
                  height={24}
                  className="absolute"
                />
              </div>
              <h1 className="text-xs text-gray-400">
                {user.first_name} {user.last_name}
              </h1>
            </div>
          </div>

          <p
            dangerouslySetInnerHTML={{
              __html: text.replace(/\n?\r/g, "<br />"),
            }}
          />
        </div>
      </div>
    </DottedBackground>
  );
}
