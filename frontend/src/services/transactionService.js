import api from "../api/axios";

// Dashboard
export const getDashboardData = async () => {
    const response = await api.get("/transactions/dashboard");
    return response.data;
};

// Analytics
export const getAnalytics = async () => {
    const response = await api.get("/transactions/analytics");
    return response.data;
};

// Category Breakdown
export const getCategoryStats = async () => {
    const response = await api.get("/transactions/categories");
    return response.data;
};

// Transactions
export const getTransactions = async (params = {}) => {
    const response = await api.get("/transactions", {
        params,
    });

    return response.data;
};

// Create
export const createTransaction = async (transactionData) => {
    const response = await api.post(
        "/transactions",
        transactionData
    );

    return response.data;
};

// Delete
export const deleteTransaction = async (id) => {
    const response = await api.delete(
        `/transactions/${id}`
    );

    return response.data;
};