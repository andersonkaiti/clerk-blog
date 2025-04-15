import { ITableProps } from ".";

export function TableRoot({ children }: ITableProps) {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-400 rtl:text-right">
        {children}
      </table>
    </div>
  );
}
