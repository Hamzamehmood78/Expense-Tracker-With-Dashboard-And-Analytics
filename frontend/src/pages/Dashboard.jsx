import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import SummaryCard from "../components/SummaryCard";
import TrendChart from "../components/TrendChart";
import CategoryChart from "../components/CategoryChart";
import RecentTransactions from "../components/RecentTransactions";
import { getDashboardData } from "../services/transactionService";

import {
    FaArrowUp,
    FaArrowDown,
    FaWallet,
} from "react-icons/fa";

export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const data = await getDashboardData();

                setDashboardData(data.dashboard);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <Layout>
                <h1 className="text-white text-4xl">
                    Loading...
                </h1>
            </Layout>
        );
    }

    const summary = dashboardData.summary;

    return (
        <Layout>

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-white">
                    Dashboard
                </h1>

                <p className="mt-2 text-slate-400">
                    Overview of your finances
                </p>

            </div>

            <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">

                    <SummaryCard
                        title="Total Income"
                        value={summary.totalIncome}
                        icon={<FaArrowUp size={28} />}
                        glowColor="green"
                    />

                    <SummaryCard
                        title="Total Expense"
                        value={summary.totalExpense}
                        icon={<FaArrowDown size={28} />}
                        glowColor="red"
                    />

                    <SummaryCard
                        title="Current Balance"
                        value={summary.balance}
                        icon={<FaWallet size={28} />}
                        glowColor="cyan"
                    />

                </div>
            </div>

            <div className="mt-10">

                <TrendChart
                    data={dashboardData.last7Days}
                />

            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">

                <CategoryChart
                    data={dashboardData.categories}
                />

                <RecentTransactions
                    transactions={dashboardData.recentTransactions}
                />

            </div>

        </Layout>
    );
}