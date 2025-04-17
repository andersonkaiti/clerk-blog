export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center">
      <div className="mx-auto w-full animate-pulse space-y-4 px-4 sm:max-w-4xl">
        <div className="space-y-2">
          <div className="mb-2 h-5 w-10 rounded-lg bg-gray-600" />
          <div className="h-10.5 w-full rounded-lg bg-gray-600" />
        </div>
        <div className="space-y-2">
          <div className="mb-2 h-5 w-10 rounded-lg bg-gray-600" />
          <div className="h-15.5 w-full rounded-lg bg-gray-600" />
        </div>
        <div className="h-10.5 w-full rounded-lg bg-gray-600" />
      </div>
    </div>
  );
}
