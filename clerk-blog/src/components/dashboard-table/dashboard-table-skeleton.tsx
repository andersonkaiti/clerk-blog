export default function DashboardTableSkeleton() {
  return (
    <div className="flex h-fit flex-col items-center">
      <div className="sm:rounded-lgx w-full overflow-x-auto shadow-md">
        <div className="flex w-full animate-pulse flex-col gap-6 divide-gray-700 overflow-hidden border border-gray-700 bg-neutral-950 p-4 shadow-sm sm:rounded-lg">
          <div className="flex justify-between gap-10 border-b-1 border-gray-700 pb-4">
            {[...new Array(5)].map((_, index: number) => (
              <div key={index}>
                <div className="h-6 w-35 rounded-full bg-gray-600" />
              </div>
            ))}
          </div>
          {[...new Array(9)].map((_, outerIndex) => (
            <div key={outerIndex} className="flex justify-between gap-10">
              {[...new Array(5)].map((_, index: number) => (
                <div key={index}>
                  <div className="h-6 w-35 rounded-full bg-gray-600" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
