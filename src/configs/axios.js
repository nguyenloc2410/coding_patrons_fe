import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response;
  }
);
export default instance;
