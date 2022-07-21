import { GuestModel } from ".";

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
  orderByDirection: string;
  country: string;
  searchString: string;
  isAttendingFilter?: string;
  invitedBy?: string;
};

export type SwipingState = {
  left: number;
  originalOffset: number;
  velocity: number;
  timeOfLastDragEvent: number;
  touchStartX: number;
  prevTouchX: number;
  beingTouched: boolean;
  height: number;
};

export type UpdateGuest = {
  guest: GuestModel;
  paginateRequest: PaginateRequest;
};
