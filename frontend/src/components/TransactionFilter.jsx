export default function TransactionFilter() {
    return (
        <div className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

            <select className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none">
                <option>All</option>
                <option>Income</option>
                <option>Expense</option>
            </select>

            <input
                type="date"
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
            />
        </div>
    );
}