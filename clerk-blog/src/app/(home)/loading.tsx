export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
      <div className="grid h-full w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
        {[...new Array(9)].map((_, index: number) => (
          <div
            key={index}
            role="status"
            className="h-[162px] w-full animate-pulse space-y-4 divide-gray-700 overflow-hidden rounded-lg border border-gray-700 p-6 shadow-sm"
          >
            <div className="mb-2 h-8 w-70 rounded-full bg-gray-600" />
            <div className="mb-3 h-6 w-50 rounded-full bg-gray-600" />
            <div className="h-9 w-33 rounded-lg bg-gray-600 px-3 py-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
