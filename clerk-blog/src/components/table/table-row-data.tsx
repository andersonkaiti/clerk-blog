import { cn } from "@utils/cn";
import { ITableProps } from ".";

export function TableRowData({ children, className }: ITableProps) {
  return (
    <td className={cn("flex items-center px-6 py-4", className)}>{children}</td>
  );
}
