import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Pagination } from "@components/pagination";
import { IPaginatedPosts } from "types/paginated-posts";

export interface IHomePaginationProps {
  pagination: Omit<IPaginatedPosts, "data">;
}

export function HomePagination({ pagination }: IHomePaginationProps) {
  return (
    <Pagination.Root>
      <Pagination.Button href={`/?page=${pagination.first}`}>
        <ChevronsLeft />
      </Pagination.Button>

      <Pagination.Button href={`/?page=${pagination.prev || pagination.page}`}>
        {pagination.prev ? <ChevronLeft /> : "..."}
      </Pagination.Button>

      <Pagination.Button href={`/?page=${pagination.prev || pagination.page}`}>
        {pagination.prev || "..."}
      </Pagination.Button>
      <Pagination.Button href={`/?page=${pagination.page}`}>
        {pagination.page}
      </Pagination.Button>
      <Pagination.Button href={`/?page=${pagination.next || pagination.page}`}>
        {pagination.next || "..."}
      </Pagination.Button>

      <Pagination.Button href={`/?page=${pagination.next || pagination.page}`}>
        {pagination.next ? <ChevronRight /> : "..."}
      </Pagination.Button>
      <Pagination.Button href={`/?page=${pagination.last}`}>
        <ChevronsRight />
      </Pagination.Button>
    </Pagination.Root>
  );
}
