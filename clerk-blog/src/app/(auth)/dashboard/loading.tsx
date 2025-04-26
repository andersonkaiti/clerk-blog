import { DashboardSkeleton } from "@components/dashboard-table/skeleton";
import { PaginationButtonSkeleton } from "@components/pagination/pagination-button-skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center">
      <div className="sm:rounded-lgx flex w-full flex-1 flex-col overflow-x-auto p-5 shadow-md">
        <div className="flex animate-pulse items-center justify-between gap-2 py-4">
          <div className="h-7.5 w-54 rounded-lg bg-gray-600" />
          <div className="h-9 w-29.5 rounded-lg bg-gray-600 px-3 py-2" />
        </div>
        <div className="flex w-full flex-1 flex-col items-center justify-between gap-4 pb-5">
          <DashboardSkeleton.Root>
            <DashboardSkeleton.Table />
          </DashboardSkeleton.Root>
          <PaginationButtonSkeleton />
        </div>
      </div>
    </div>
  );
}
