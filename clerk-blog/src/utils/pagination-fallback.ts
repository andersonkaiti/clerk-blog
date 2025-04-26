import { IPaginatedPosts } from "types/paginated-posts";

export const paginationFallback: IPaginatedPosts = {
  page: 1,
  first: 1,
  prev: null,
  next: null,
  last: 1,
  count: 0,
  data: undefined,
};
