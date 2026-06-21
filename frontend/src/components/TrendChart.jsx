import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

export default function TrendChart({ data = [] }) {

    return (
        <div className="h-[450px] rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

            <h2 className="mb-6 text-xl font-bold text-white">
                Income vs Expense Trend
            </h2>

            {data.length === 0 ? (
                <div className="flex h-[320px] items-center justify-center text-slate-500">
                    No trend data available
                </div>
            ) : (

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 0,
                            bottom: 10,
                        }}
                    >

                        <CartesianGrid
                            stroke="rgba(255,255,255,0.05)"
                        />

                        <XAxis
                            dataKey="_id"
                            stroke="#94a3b8"
                        />

                        <YAxis
                            stroke="#94a3b8"
                        />

                        <Tooltip
                            contentStyle={{
                                background: "#0f172a",
                                border: "1px solid #334155",
                                borderRadius: "12px",
                                color: "white",
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="income"
                            stroke="#22c55e"
                            strokeWidth={4}
                            dot={false}
                        />

                        <Line
                            type="monotone"
                            dataKey="expense"
                            stroke="#ef4444"
                            strokeWidth={4}
                            dot={false}
                        />

                    </LineChart>

                </ResponsiveContainer>

            )}

        </div>
    );
}