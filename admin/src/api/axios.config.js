import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.BACKEND_BASE_URL || "http://localhost:3000",
    withCredentials: true,
})

export default instance;