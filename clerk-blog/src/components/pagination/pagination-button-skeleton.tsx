export function PaginationButtonSkeleton() {
  return (
    <div className="flex gap-2">
      {[...new Array(7)].map((_, index: number) => (
        <div
          key={index}
          className="h-10 w-10 animate-pulse rounded-md bg-gray-600"
        />
      ))}
    </div>
  );
}
