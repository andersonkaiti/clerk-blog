import DashboardTableSkeleton from "@components/dashboard-table/dashboard-table-skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center">
      <div className="sm:rounded-lgx w-full overflow-x-auto p-5 shadow-md">
        <div className="flex animate-pulse items-center justify-between gap-2 py-4">
          <div className="h-7.5 w-54 rounded-lg bg-gray-600" />
          <div className="h-9 w-29.5 rounded-lg bg-gray-600 px-3 py-2" />
        </div>
        <DashboardTableSkeleton />
      </div>
    </div>
  );
}
