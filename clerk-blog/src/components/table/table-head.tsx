import { cn } from "@utils/cn";
import { ITableProps } from ".";

export function TableHead({ children, className }: ITableProps) {
  return (
    <thead
      className={cn(
        "bg-neutral-950 text-xs text-gray-400 uppercase",
        className,
      )}
    >
      <tr>{children}</tr>
    </thead>
  );
}
