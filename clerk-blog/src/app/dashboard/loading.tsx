export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center">
      <div className="w-full overflow-x-auto p-5 shadow-md sm:rounded-lg lg:w-fit">
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
