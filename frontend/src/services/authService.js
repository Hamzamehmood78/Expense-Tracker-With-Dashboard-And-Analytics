import api from "../api/axios";

// Register
export const registerUser = async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
};

// Login
export const loginUser = async (userData) => {
    const response = await api.post("/auth/login", userData);
    return response.data;
};

// Logout
export const logoutUser = async () => {
    const response = await api.post("/auth/logout");
    return response.data;
};

// Current User
export const getCurrentUser = async () => {
    const response = await api.get("/auth/me");
    return response.data;
};