import React from "react";
import { PaginationDto as PaginationDto } from "./common";

export interface KeyValuePair {
  name: string;
  value: any[];
}

export interface UIControlState {
  uiType: number;
  lang: string;
  modal: ModalModel;
  carouselPosition: number;
  carouselElementCount: number;
  RSVPCount: number;
}

export interface MainState {
  modal: ModalModel;
  alert: AlertModel;
  singapore: PaginationDto;
  malaysia: PaginationDto;
  attendanceForm: AttendanceFormModel;
  dashboard: DashboardDto | undefined;
}

export type CountryDataDto = {
  guests: GuestModel[];
  accepted: number;
  declined: number;
  total: number;
  expectedGuest: number;
};

export type CountDownDaysDto = {
  eventDate: Date;
  till: number;
};

export type DashboardDto = {
  sg: CountryDataDto;
  my: CountryDataDto;
  sgDatetime: CountDownDaysDto;
  myDatetime: CountDownDaysDto;
  isLoading: boolean;
};

export type UIGuestModel = {
  guests: GuestModel[];
  isLoading: boolean;
};

export type GuestModel = {
  sanitizedName: string;
  isAttending: boolean;
  invitedBy: string;
  name: string;
  dietaryPreference: string;
  rsvpDateTime: string;
  isActive?: boolean;
};

export interface LocationModel {
  name: string;
  address: string;
  coordinates: google.maps.LatLngLiteral;
  datetime: string;
  code: string;
  theme: {
    name: string;
    colors: string[];
  };
  schedule: ScheduleModel;
}

export interface CardModel {
  isActive: boolean;
  position: number;
  index: number;
}

export interface ModalModel {
  message: string;
  header: string;
  isShow: boolean;
  isError: boolean;
  result: boolean;
  yesCallback: () => void | undefined;
  noCallback: () => void | undefined;
  messageJSX: React.ReactNode;
}

export interface AlertModel {
  message: string;
  header: string;
  isShow: boolean;
}

export interface AttendanceFormProps {
  id: string;
  attendingList: AttendingListModel[];
  country: string;
}

export interface AttendingListModel {
  name: string;
  isAttending: string | undefined;
  dietaryPreference: string;
}

export interface AttendanceFormModel {
  attendanceFormProps: AttendanceFormProps;
  invitedBy: string;
  isLoading: boolean;
}

export interface ScheduleModel {
  items: ScheduleItem[];
}

export interface ScheduleItem {
  time: string;
  eventName: string;
}

export interface TableFilterFormProps {
  name: string;
  pageSize: number;
  filterBy: string;
}
