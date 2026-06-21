const Transaction = require("../models/transaction.model");

// CREATE
const createTransaction = async (userId, data) => {
    const transaction = await Transaction.create({
        user: userId,
        ...data
    });

    return transaction;
};

// GET ALL USER TRANSACTIONS
const getTransactions = async (userId, query) => {
    const filter = { user: userId };

    // filter by type (income/expense)
    if (query.type) {
        filter.type = query.type;
    }

    // filter by category
    if (query.category) {
        filter.category = query.category;
    }

    // date range filter
    if (query.startDate && query.endDate) {
        filter.createdAt = {
            $gte: new Date(query.startDate),
            $lte: new Date(query.endDate)
        };
    }

    return await Transaction.find(filter).sort({ createdAt: -1 });
};

// DELETE TRANSACTION
const deleteTransaction = async (userId, transactionId) => {
    const transaction = await Transaction.findOneAndDelete({
        _id: transactionId,
        user: userId
    });

    if (!transaction) {
        throw new Error("Transaction not found");
    }

    return transaction;
};

// Analytics Function for the Dashboard
const getAnalytics = async (userId) => {
    const ObjectId = require("mongoose").Types.ObjectId;

    const data = await Transaction.aggregate([
        {
            $match: {
                user: new ObjectId(userId)
            }
        },

        {
            $group: {
                _id: null,

                totalIncome: {
                    $sum: {
                        $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
                    }
                },

                totalExpense: {
                    $sum: {
                        $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
                    }
                }
            }
        }
    ]);

    const result = data[0] || {
        totalIncome: 0,
        totalExpense: 0
    };

    return {
        totalIncome: result.totalIncome,
        totalExpense: result.totalExpense,
        balance: result.totalIncome - result.totalExpense
    };
};

const getCategoryBreakdown = async (userId) => {
    const ObjectId = require("mongoose").Types.ObjectId;

    return await Transaction.aggregate([
        {
            $match: {
                user: new ObjectId(userId),
                type: "expense"
            }
        },

        {
            $group: {
                _id: "$category",
                total: { $sum: "$amount" }
            }
        },

        {
            $sort: { total: -1 }
        }
    ]);
};

const getDashboardData = async (userId) => {
    const ObjectId = require("mongoose").Types.ObjectId;

    const data = await Transaction.aggregate([
        {
            $match: {
                user: new ObjectId(userId)
            }
        },

        {
            $facet: {
                // 1. TOTALS
                summary: [
                    {
                        $group: {
                            _id: null,
                            totalIncome: {
                                $sum: {
                                    $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
                                }
                            },
                            totalExpense: {
                                $sum: {
                                    $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
                                }
                            }
                        }
                    }
                ],

                // 2. CATEGORY BREAKDOWN
                categories: [
                    {
                        $match: { type: "expense" }
                    },
                    {
                        $group: {
                            _id: "$category",
                            total: { $sum: "$amount" }
                        }
                    },
                    {
                        $sort: { total: -1 }
                    }
                ],

                // 3. RECENT TRANSACTIONS
                recent: [
                    {
                        $sort: { createdAt: -1 }
                    },
                    {
                        $limit: 5
                    }
                ],

                // 4. LAST 7 DAYS TREND
                last7Days: [
                    {
                        $match: {
                            createdAt: {
                                $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                            }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                $dateToString: {
                                    format: "%Y-%m-%d",
                                    date: "$createdAt"
                                }
                            },
                            income: {
                                $sum: {
                                    $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
                                }
                            },
                            expense: {
                                $sum: {
                                    $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
                                }
                            }
                        }
                    },
                    {
                        $sort: { _id: 1 }
                    }
                ]
            }
        }
    ]);

    const result = data[0];

    const summary = result.summary[0] || {
        totalIncome: 0,
        totalExpense: 0
    };

    return {
        summary: {
            totalIncome: summary.totalIncome,
            totalExpense: summary.totalExpense,
            balance: summary.totalIncome - summary.totalExpense
        },

        categories: result.categories,

        recentTransactions: result.recent,

        last7Days: result.last7Days
    };
};

module.exports = {
    createTransaction,
    getTransactions,
    deleteTransaction,
    getAnalytics,
    getCategoryBreakdown,
    getDashboardData
};