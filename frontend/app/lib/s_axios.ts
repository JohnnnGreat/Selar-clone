// ~/lib/server/axios.server.ts
import axios from "axios";
import { type LoaderArgs } from "@remix-run/node";

export const createServerApi = (request: Request) => {
   const ServerApiRequest = axios.create({
      baseURL: "http://localhost:4040/api/v1",
      withCredentials: true,
   });

   const cookieHeader = request.headers.get("Cookie");
   const authToken = cookieHeader
      ?.split(";")
      .find((cookie) => cookie.trim().startsWith("auth-tokend="))
      ?.split("=")[1];

   if (authToken) {
      ServerApiRequest.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
   }

   ServerApiRequest.interceptors.response.use(
      (response) => response,
      (error) => {
         if (error.response?.status === 401) {
         }
         return Promise.reject(error);
      },
   );

   return ServerApiRequest;
};

// Helper function to use in loaders
export async function authenticatedLoader({ request }: LoaderArgs) {
   const api = createServerApi(request);

   try {
      // Example: verify the token or get user data
      const response = await api.get("/user/me");
      return response.data;
   } catch (error) {
      // Handle authentication errors
      throw new Error("Unauthorized");
   }
}
