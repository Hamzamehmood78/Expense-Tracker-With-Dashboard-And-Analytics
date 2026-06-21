const { createTransaction, getTransactions, deleteTransaction } = require("../services/transaction.service");
const { getAnalytics } = require("../services/transaction.service");
const { getCategoryBreakdown } = require("../services/transaction.service");
const { getDashboardData } = require("../services/transaction.service");

// CREATE
const create = async (req, res) => {
    try {
        const transaction = await createTransaction(req.user._id, req.body);

        res.status(201).json({
            success: true,
            transaction
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// GET ALL
const getAll = async (req, res) => {
    try {
        const transactions = await getTransactions(req.user._id, req.query);

        res.json({
            success: true,
            transactions
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE
const remove = async (req, res) => {
    try {
        const transaction = await deleteTransaction(
            req.user._id,
            req.params.id
        );

        res.json({
            success: true,
            message: "Deleted successfully",
            transaction
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// ANALYTICS
const analytics = async (req, res) => {
    try {
        const data = await getAnalytics(req.user._id);

        res.json({
            success: true,
            analytics: data
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// CATEGORY STATS
const categoryStats = async (req, res) => {
    try {
        const data = await getCategoryBreakdown(req.user._id);

        res.json({
            success: true,
            categories: data
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Actual Dahsboard of the Whole Application
const dashboard = async (req, res) => {
    try {
        const data = await getDashboardData(req.user._id);

        res.json({
            success: true,
            dashboard: data
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    create,
    getAll,
    remove,
    analytics,
    categoryStats,
    dashboard
};