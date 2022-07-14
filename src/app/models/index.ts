import React from "react";

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
  singapore: LocationModel;
  malaysia: LocationModel;
  currentLocation: LocationModel;
  attendanceForm: AttendanceFormModel;
  singaporeGuests: UIGuestModel;
  malaysiaGuests: UIGuestModel;
}

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
