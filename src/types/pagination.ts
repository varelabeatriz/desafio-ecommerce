export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  total: number;
  skip: number;
  currentCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
};
