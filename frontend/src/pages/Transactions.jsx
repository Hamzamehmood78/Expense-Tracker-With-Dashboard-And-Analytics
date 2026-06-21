import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

import {
    getTransactions,
    createTransaction,
    deleteTransaction,
} from "../services/transactionService";

export default function Transactions() {

    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        try {
            const data = await getTransactions();

            setTransactions(data.transactions);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleCreate = async (formData) => {
        try {
            await createTransaction(formData);

            await fetchTransactions();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTransaction(id);

            await fetchTransactions();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-white">
                    Transactions
                </h1>

                <p className="text-slate-400">
                    Manage your income and expenses
                </p>

            </div>

            <div className="flex flex-col gap-10">

                <div className="flex justify-center">

                    <div className="w-full max-w-2xl">

                        <TransactionForm
                            onSubmit={handleCreate}
                        />

                    </div>

                </div>

                <TransactionList
                    transactions={transactions}
                    onDelete={handleDelete}
                />

            </div>

        </Layout>
    );
}