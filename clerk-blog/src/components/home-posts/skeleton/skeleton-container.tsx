import { ISkeleton } from ".";

export function SkeletonContainer({ children }: ISkeleton) {
  return (
    <div className="grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2">
      {children}
    </div>
  );
}
