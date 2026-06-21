export default function RecentTransactions({
    transactions = []
}) {
    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

            <h2 className="mb-6 text-2xl font-bold text-white">
                Recent Transactions
            </h2>

            <div className="space-y-4">

                {transactions.map((tx) => (
                    <div
                        key={tx._id}
                        className="
                            flex
                            items-center
                            justify-between
                            rounded-2xl
                            border
                            border-white/5
                            bg-black/20
                            p-4
                        "
                    >
                        <div>
                            <p className="font-medium text-white">
                                {tx.title}
                            </p>

                            <p className="text-sm text-slate-500">
                                {tx.category}
                            </p>
                        </div>

                        <p
                            className={
                                tx.type === "income"
                                    ? "font-semibold text-green-400"
                                    : "font-semibold text-red-400"
                            }
                        >
                            ₹{tx.amount}
                        </p>
                    </div>
                ))}

            </div>

        </div>
    );
}