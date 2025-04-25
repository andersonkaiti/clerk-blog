import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Pagination } from "@components/pagination";
import { IPaginatedPosts } from "types/paginated-posts";

export interface IDashboardPaginationProps {
  pagination: Omit<IPaginatedPosts, "data">;
}

export function DashboardPagination({ pagination }: IDashboardPaginationProps) {
  return (
    <Pagination.Root>
      <Pagination.Button href={`/dashboard?page=${pagination.first}`}>
        <ChevronsLeft />
      </Pagination.Button>

      <Pagination.Button
        href={`/dashboard?page=${pagination.prev || pagination.page}`}
      >
        {pagination.prev ? <ChevronLeft /> : "..."}
      </Pagination.Button>

      <Pagination.Button
        href={`/dashboard?page=${pagination.prev || pagination.page}`}
      >
        {pagination.prev || "..."}
      </Pagination.Button>
      <Pagination.Button href={`/dashboard?page=${pagination.page}`}>
        {pagination.page}
      </Pagination.Button>
      <Pagination.Button
        href={`/dashboard?page=${pagination.next || pagination.page}`}
      >
        {pagination.next || "..."}
      </Pagination.Button>

      <Pagination.Button
        href={`/dashboard?page=${pagination.next || pagination.page}`}
      >
        {pagination.next ? <ChevronRight /> : "..."}
      </Pagination.Button>
      <Pagination.Button href={`/dashboard?page=${pagination.last}`}>
        <ChevronsRight />
      </Pagination.Button>
    </Pagination.Root>
  );
}
