import { getAllPosts } from "@actions/post";
import { PostCard } from "@components/post-card";
import { IUserPost } from "types/user-post";

export default async function Home() {
  const posts: IUserPost[] = await getAllPosts();

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center space-y-4">
      <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
        {posts.map((post: IUserPost, index: number) => (
          <PostCard post={post} key={index} />
        ))}
      </div>
    </div>
  );
}
