export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col items-center justify-center space-y-4 px-8">
      <div className="w-full space-y-8">
        <div className="h-6 w-18.5 rounded-full bg-gray-600" />
        <div className="h-4 w-43 rounded-full bg-gray-600" />
        <div className="h-12 w-43 rounded-full bg-gray-600" />
        <div className="space-y-2">
          <div className="h-4 w-18 rounded-full bg-gray-600" />
          <div className="flex items-center gap-1">
            <div className="h-6 w-6 rounded-full bg-gray-600" />
            <div className="h-4 w-14 rounded-full bg-gray-600" />
          </div>
          <div className="mt-8 h-0.5 w-full rounded-full bg-gray-600" />
        </div>
        <div className="space-y-1">
          <div className="h-6 w-full rounded-full bg-gray-600" />
          <div className="h-6 w-1/2 rounded-full bg-gray-600" />
        </div>
      </div>
    </div>
  );
}
