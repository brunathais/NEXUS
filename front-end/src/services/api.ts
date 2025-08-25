import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            // opcional: redirecionar para login
        }
        return Promise.reject(err);
    }
);
