import axios from "axios"

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

// Global response error handler
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(
            error.response?.data?.message || error.message
        )
        return Promise.reject(error)
    }
)