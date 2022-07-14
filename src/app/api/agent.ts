import axios, { AxiosResponse } from "axios";
import * as models from "../models";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_GCP_FUNCTION_URL
    : process.env.REACT_APP_GCP_FUNCTION_TEST_URL;

console.log(process.env.REACT_APP_GCP_FUNCTION_TEST_URL);
console.log(process.env.REACT_APP_GCP_FUNCTION_URL);

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
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const WeddingInfo = {
  location: (id: string) => requests.get(`/location/${id}`),
  attendance: (attendanceFormProps: models.AttendanceFormModel) =>
    requests.post(`/guest/attendance`, attendanceFormProps),
  guests: (country: string) => requests.get(`/guests/${country}`),
};

export default {
  WeddingInfo,
};
