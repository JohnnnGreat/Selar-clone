// ~/lib/server/axios.server.ts
import axios from "axios";

export const ServerApiRequest = axios.create({
   baseURL: "http://localhost:4040/api/v1",
});
