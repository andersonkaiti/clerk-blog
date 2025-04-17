import { ReactNode } from "react";
import { cn } from "@utils/cn";

export interface IDottedBackgroundProps {
  children: ReactNode;
}

export function DottedBackground({ children }: IDottedBackgroundProps) {
  return (
    <div className="relative flex w-full items-center justify-center bg-neutral-950">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      <div className="z-20 w-full">{children}</div>
    </div>
  );
}
