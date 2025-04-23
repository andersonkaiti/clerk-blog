import { PostCard } from "@components/post-card";
import { IPost } from "types/user-post";
import { useGetAllPosts } from "@hooks/get-all-posts.hook";

export interface IHomePostsProps {
  filter: string;
}

export function HomePosts({ filter }: IHomePostsProps) {
  const { data: posts } = useGetAllPosts(filter);

  return (
    <div className="grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2">
      {posts?.map((post: IPost, index: number) => (
        <PostCard post={post} key={index} />
      ))}
    </div>
  );
}
