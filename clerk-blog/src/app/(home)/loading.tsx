import { HomeSkeleton } from "@components/home-posts/skeleton";
import { PaginationButtonSkeleton } from "@components/pagination/pagination-button-skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] w-full flex-col items-center justify-between space-y-4 p-4 sm:p-10">
      <div className="mb-3 h-7.5 w-54 animate-pulse rounded-lg bg-gray-600" />
      <HomeSkeleton.Root>
        <HomeSkeleton.Cards />
      </HomeSkeleton.Root>
      <PaginationButtonSkeleton />
    </div>
  );
}
