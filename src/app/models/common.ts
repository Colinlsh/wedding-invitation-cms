export type PaginationDto = {
  currentPageNumber: number;
  totalRecords: number;
  totalPage: number;
  items: any[];
  isLoading: boolean;
};

export type PaginateRequest = {
  currentPageNumber: number;
  pageSize: number;
  orderBy: string;
  country: string;
};
