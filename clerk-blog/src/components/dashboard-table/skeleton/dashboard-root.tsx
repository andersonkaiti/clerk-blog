import { IDashboardSkeletonProps } from ".";

export function DashboardSkeletonRoot({ children }: IDashboardSkeletonProps) {
  return (
    <div className="flex w-full animate-pulse flex-col divide-gray-700 overflow-hidden bg-neutral-950 shadow-sm sm:rounded-lg">
      {children}
    </div>
  );
}
