export const dynamic = "force-dynamic";

import { DottedBackground } from "@components/dotted-background";
import { Filter } from "@components/filter";
import { PostCard } from "@components/post-card";
import { getAllPosts } from "@actions/get-all-posts";
import { IPost } from "types/user-post";

export interface IHomeProps {
  searchParams: Promise<{ filter: string }>;
}

export default async function Home({ searchParams }: IHomeProps) {
  const { filter = "" } = await searchParams;

  const posts: IPost[] = await getAllPosts(filter);

  return (
    <DottedBackground>
      <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center space-y-4 p-4 sm:p-10">
        <Filter url={filter && `/?filter=${filter}`} filter={filter} />

        <div className="grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2">
          {posts?.map((post: IPost, index: number) => (
            <PostCard post={post} key={index} />
          ))}
        </div>
      </div>
    </DottedBackground>
  );
}
