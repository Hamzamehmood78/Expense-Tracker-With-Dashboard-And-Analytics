import { useState } from "react";

export default function TransactionForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        type: "expense",
        category: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await onSubmit({
            ...formData,
            amount: Number(formData.amount),
        });

        setFormData({
            title: "",
            amount: "",
            type: "expense",
            category: "",
        });
    };

    return (
        <div className="
    rounded-3xl
    border
    border-cyan-500/10
    bg-white/5
    p-8
    backdrop-blur-xl
    shadow-[0_0_40px_rgba(34,211,238,0.08)]
">

            <h2 className="mb-6 text-2xl font-bold text-white">
                Add Transaction
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white"
                />

                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white"
                />

                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white"
                >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>

                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Category"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white"
                />

                <button
                    type="submit"
                    className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black"
                >
                    Add Transaction
                </button>

            </form>

        </div>
    );
}