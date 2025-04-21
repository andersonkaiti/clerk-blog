import { ReactNode, ThHTMLAttributes } from "react";
import { TableBody } from "./table-body";
import { TableHead } from "./table-head";
import { TableHeadTitle } from "./table-head-title";
import { TableRoot } from "./table-root";
import { TableRow } from "./table-row";
import { TableRowData } from "./table-row-data";
import { TableRowHead } from "./table-row-head";

export interface ITableProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

export const Table = {
  Root: TableRoot,
  Head: TableHead,
  Title: TableHeadTitle,
  Body: TableBody,
  Row: TableRow,
  RowHead: TableRowHead,
  RowData: TableRowData,
};
