export const dynamic = "force-dynamic";

import { DottedBackground } from "@components/dotted-background";
import { PostCard } from "@components/post-card";
import { getAllPosts } from "@actions/get-all-posts";
import { IPost } from "types/user-post";

export default async function Home() {
  const posts: IPost[] = await getAllPosts();

  return (
    <DottedBackground>
      <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center space-y-4">
        <div className="grid w-full max-w-7xl grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-10">
          {posts.map((post: IPost, index: number) => (
            <PostCard post={post} key={index} />
          ))}
        </div>
      </div>
    </DottedBackground>
  );
}
