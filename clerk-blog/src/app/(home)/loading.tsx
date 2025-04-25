import { DottedBackground } from "@components/dotted-background";
import HomePostsSkeleton from "@components/home-posts/home-posts-skeleton";

export default function Loading() {
  return (
    <DottedBackground>
      <div className="flex min-h-[calc(100vh-5rem)] w-full flex-col items-center justify-between p-4 sm:p-10">
        <div className="mb-3 h-7.5 w-54 animate-pulse rounded-lg bg-gray-600" />
        <HomePostsSkeleton />
      </div>
    </DottedBackground>
  );
}
