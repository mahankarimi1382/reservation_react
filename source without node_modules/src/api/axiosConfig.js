import axios from "axios";
import Cookies from "js-cookie";
import { Eror } from "../components/ToastAlerts";
import { myStore } from "../store/Store";

export const axiosConfig = axios.create({
  baseURL: "https://myapi.dadehavaran.com:8040/API/v1/",
  headers: {
    "Content-Type": "application/json",
    // Authorization header will be set dynamically
  },
});

// 🟢 Request Interceptor: Set token dynamically from Cookies or Store
axiosConfig.interceptors.request.use(
  (config) => {
    let token = Cookies.get("token");

    if (!token && myStore?.token) {
      token = myStore.token;
    }

    if (token) {
      config.headers["Authorization"] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔴 Response Interceptor: Handle errors globally
axiosConfig.interceptors.response.use(
  (response) => response,
  (err) => {
    console.log(err);
    if (err.message === "Request failed with status code 401") {
      Eror("لطفا در ابتدا وارد شوید");
    } else if (err.message === "Network Error") {
      Eror("خطا در برقراری ارتباط !");
    } else if (
      err.response &&
      err.response.data.message &&
      err.response.data.message.message
    ) {
      Eror(err.response.data.message.message);
    } else if (err.response) {
      Eror(err.response.data.message);
    }

    return Promise.reject(err);
  }
);