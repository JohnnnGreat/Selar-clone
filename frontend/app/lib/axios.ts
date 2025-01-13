import axios from "axios";

const ApiRequest = axios.create({
   baseURL: "http://localhost:4040/api/v1",
});

ApiRequest.interceptors.request.use(
   (config): any => {
      const AUTH_TOKEN = localStorage.getItem("AUTH_USER");
      ApiRequest.defaults.headers.common["Authorization"] = AUTH_TOKEN;

      return config;
   },
   (err) => {
      return Promise.reject(err);
   },
);

ApiRequest.interceptors.response.use(
   (response): any => {
      console.log(response);
      return response;
   },
   (err) => {
      return Promise.reject(err);
   },
);

export default ApiRequest;
