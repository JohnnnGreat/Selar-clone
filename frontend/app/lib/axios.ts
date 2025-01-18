// ~/lib/axios.ts (for client-side usage)
import axios from "axios";
import Cookies from "js-cookie";

const ApiRequest = axios.create({
  baseURL: "http://localhost:4040/api/v1",
});

const authToken = Cookies.get("auth-tokend");

// Only add interceptors when window is defined (client-side)
if (typeof window !== "undefined") {
  ApiRequest.interceptors.request.use(
    (config): any => {
      config.headers.Authorization = `Bearer ${authToken}`;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  ApiRequest.interceptors.response.use(
    (response): any => {
      console.log(response);
      return response;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}

export default ApiRequest;
