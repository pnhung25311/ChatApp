import axios from "axios";
export const axiosInstance = axios.create({
    baseURL: "http://localhost:2113/api",
    withCredentials: true,
    timeout: 30000
})