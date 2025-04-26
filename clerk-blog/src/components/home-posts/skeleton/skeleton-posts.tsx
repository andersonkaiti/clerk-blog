export function SkeletonCards() {
  return (
    <>
      {[...new Array(4)].map((_, index: number) => (
        <div
          key={index}
          role="status"
          className="h-[179.19px] w-full animate-pulse space-y-2 divide-gray-700 overflow-hidden rounded-lg border border-gray-700 bg-black p-4 shadow-sm"
        >
          <div className="mb-3 h-6 w-30 rounded-full bg-gray-600" />
          <div className="mb-2 h-[31.99px] w-2/3 rounded-full bg-gray-600" />
          <div className="mb-3 h-6 w-1/2 rounded-full bg-gray-600" />
          <div className="h-[37.6px] w-33 rounded-lg bg-gray-600 px-3 py-2" />
        </div>
      ))}
    </>
  );
}
