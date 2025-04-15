import clsx from "clsx";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface IDottedBackgroundProps {
  children: ReactNode;
}

export function DottedBackground({ children }: IDottedBackgroundProps) {
  return (
    <div className="relative flex w-full items-center justify-center bg-neutral-950">
      <div
        className={twMerge(
          clsx(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#404040_1px,transparent_1px)]",
          ),
        )}
      />
      <div className="z-20 w-full">{children}</div>
    </div>
  );
}
