import axios from "axios";
export const axiosInstance = axios.create({
    baseURL: import.meta.env.MOVE === "development"?"http://localhost:2113/api": "/api",
    withCredentials: true,
    timeout: 30000
})