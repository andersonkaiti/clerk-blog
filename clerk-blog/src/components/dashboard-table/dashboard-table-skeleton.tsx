export default function DashboardTableSkeleton() {
  return (
    <div className="flex h-fit w-full flex-col items-center justify-center gap-4">
      <div className="sm:rounded-lgx w-full overflow-x-auto shadow-md">
        <div className="flex w-full animate-pulse flex-col divide-gray-700 overflow-hidden border border-gray-700 bg-neutral-950 shadow-sm sm:rounded-lg">
          <div className="flex h-10 justify-between gap-10 border-b-1 border-gray-700 p-2">
            {[...new Array(5)].map((_, index: number) => (
              <div key={index}>
                <div className="h-6 w-35 rounded-full bg-gray-600" />
              </div>
            ))}
          </div>
          {[...new Array(4)].map((_, outerIndex) => (
            <div
              key={outerIndex}
              className="flex h-13 justify-between gap-10 p-2"
            >
              {[...new Array(5)].map((_, index: number) => (
                <div key={index}>
                  <div className="h-9 w-35 rounded-full bg-gray-600" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2">
        {[...new Array(7)].map((_, index: number) => (
          <div
            key={index}
            className="h-10 w-10 animate-pulse rounded-md bg-gray-600"
          />
        ))}
      </div>
    </div>
  );
}
