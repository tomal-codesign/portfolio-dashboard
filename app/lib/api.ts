// lib/api.ts
import axios from "axios";

const api = axios.create({
    // live server
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://backend-portfilo.vercel.app/api",
    // local server
    // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Optional: Add interceptor for token
api.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
