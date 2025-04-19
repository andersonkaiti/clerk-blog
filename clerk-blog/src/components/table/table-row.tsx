import { cn } from "@utils/cn";
import { ITableProps } from ".";

export function TableRow({ children, className }: ITableProps) {
  return (
    <tr className={cn("border-b border-gray-700 bg-black", className)}>
      {children}
    </tr>
  );
}
