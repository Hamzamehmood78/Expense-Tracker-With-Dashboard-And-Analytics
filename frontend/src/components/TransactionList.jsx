import TransactionItem from "./TransactionItem";

export default function TransactionList({
    transactions,
    onDelete,
}) {
    return (
        <div className="space-y-4">

            {transactions.map((transaction) => (
                <TransactionItem
                    key={transaction._id}
                    transaction={transaction}
                    onDelete={onDelete}
                />
            ))}

        </div>
    );
}