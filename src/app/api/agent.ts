import axios, { AxiosResponse } from "axios";
import * as models from "../models";
import { GuestModel } from "../models";
import { PaginateRequest, UpdateGuest } from "../models/common";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_GCP_FUNCTION_URL
    : process.env.REACT_APP_GCP_FUNCTION_TEST_URL;

// axios.interceptors.request.use(
//   (config) => {
//     const token = window.localStorage.getItem("jwt");
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     config.headers.common["X-HeCode"] = "AP0001";

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string, params?: {}) =>
    axios.get(url, { params: params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string, params?: {}) =>
    axios.delete(url, { params: params }).then(responseBody),
};

const WeddingInfo = {
  location: (id: string) => requests.get(`/location/${id}`),
  attendance: (attendanceFormProps: models.AttendanceFormModel) =>
    requests.post(`/guest/attendance`, attendanceFormProps),
  guests: (paginateRequest: PaginateRequest) =>
    requests.get(`/guests`, paginateRequest),
  dashboard: () => requests.get(`/dashboard`),
  updateGuest: (updateGuest: UpdateGuest) =>
    requests.put(`/guest/updateGuest`, updateGuest),
};

export default {
  WeddingInfo,
};
