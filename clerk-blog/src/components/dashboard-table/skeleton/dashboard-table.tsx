export function DashboardTableSkeleton() {
  return (
    <div className="flex h-[409.2px] w-full animate-pulse flex-col divide-gray-700 overflow-hidden border border-gray-700 bg-neutral-950 shadow-sm sm:rounded-lg">
      <div className="flex h-10 justify-between gap-10 border-b-1 border-gray-700 p-2">
        {[...new Array(5)].map((_, index: number) => (
          <div key={index}>
            <div className="h-6 w-35 rounded-full bg-gray-600" />
          </div>
        ))}
      </div>
      {[...new Array(7)].map((_, outerIndex) => (
        <div key={outerIndex} className="flex h-13 justify-between gap-10 p-2">
          {[...new Array(5)].map((_, index: number) => (
            <div key={index}>
              <div className="h-9 w-35 rounded-full bg-gray-600" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
