export const API_URL = process.env.API_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
    auth: {
        register: "/v1/auth/register",
        google_auth: "/v1/auth/google"
    }
}