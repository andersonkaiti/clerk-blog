import { DottedBackground } from "@components/dotted-background";

export default function Loading() {
  return (
    <DottedBackground>
      <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center p-4 sm:p-10">
        <div className="mb-3 h-7.5 w-54 animate-pulse rounded-lg bg-gray-600" />
        <div className="grid h-full w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2">
          {[...new Array(8)].map((_, index: number) => (
            <div
              key={index}
              role="status"
              className="h-42.5 w-full animate-pulse space-y-2 divide-gray-700 overflow-hidden rounded-lg border border-gray-700 bg-black p-4 shadow-sm"
            >
              <div className="mb-3 h-4 w-30 rounded-full bg-gray-600" />
              <div className="mb-2 h-8 w-2/3 rounded-full bg-gray-600" />
              <div className="mb-3 h-6 w-1/2 rounded-full bg-gray-600" />
              <div className="h-9 w-33 rounded-lg bg-gray-600 px-3 py-2" />
            </div>
          ))}
        </div>
      </div>
    </DottedBackground>
  );
}
