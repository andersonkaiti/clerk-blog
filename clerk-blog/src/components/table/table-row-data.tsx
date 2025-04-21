import { cn } from "@utils/cn";
import { ITableProps } from ".";

export function TableRowData({ children, className, ...rest }: ITableProps) {
  return (
    <td className={cn("flex items-center px-6 py-4", className)} {...rest}>
      {children}
    </td>
  );
}
