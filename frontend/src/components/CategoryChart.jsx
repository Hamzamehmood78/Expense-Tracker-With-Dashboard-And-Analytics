import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

const COLORS = [
    "#06b6d4",
    "#8b5cf6",
    "#22c55e",
    "#f97316",
    "#ef4444",
];

export default function CategoryChart({ data = [] }) {

    const chartData = data.map(item => ({
        name: item._id,
        value: item.total,
    }));

    return (
        <div className="h-[450px] rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

            <h2 className="mb-6 text-xl font-bold text-white">
                Spending Categories
            </h2>

            {chartData.length === 0 ? (
                <div className="flex h-[320px] items-center justify-center text-slate-500">
                    No category data available
                </div>
            ) : (

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={110}
                            paddingAngle={4}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={
                                        COLORS[
                                        index % COLORS.length
                                        ]
                                    }
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            contentStyle={{
                                background: "#0f172a",
                                border: "1px solid #334155",
                                borderRadius: "12px",
                                color: "white",
                            }}
                        />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            )}

        </div>
    );
}