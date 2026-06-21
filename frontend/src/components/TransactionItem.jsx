export default function TransactionItem({
    transaction,
    onDelete,
}) {
    return (
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">

            <div>
                <h3 className="font-semibold text-white">
                    {transaction.title}
                </h3>

                <p className="text-sm text-slate-400">
                    {transaction.category}
                </p>
            </div>

            <div className="flex items-center gap-4">

                <span
                    className={
                        transaction.type === "income"
                            ? "text-green-400"
                            : "text-red-400"
                    }
                >
                    ₹{transaction.amount}
                </span>

                <button
                    onClick={() => onDelete(transaction._id)}
                    className="text-red-400"
                >
                    Delete
                </button>

            </div>

        </div>
    );
}