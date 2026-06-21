import { NavLink } from "react-router-dom";

import {
    FaChartPie,
    FaMoneyBillWave,
    FaWallet,
    FaChevronLeft
} from "react-icons/fa";

export default function Sidebar({
    sidebarOpen,
    setSidebarOpen,
}) {

    return (
        <aside
            className={`
                fixed
                left-0
                top-0
                z-50
                h-screen
                w-72

                border-r
                border-white/10

                bg-black/40
                backdrop-blur-xl

                transition-transform
                duration-300

                ${sidebarOpen
                    ? "translate-x-0"
                    : "-translate-x-full"
                }
            `}
        >

            {/* Close Button */}

            {sidebarOpen && (
                <button
                    onClick={() =>
                        setSidebarOpen(false)
                    }
                    className="
            absolute
            -right-5
            top-6

            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-full

            border
            border-cyan-500/20

            bg-slate-900/90
            backdrop-blur-xl

            text-cyan-400

            shadow-[0_0_20px_rgba(34,211,238,0.25)]

            transition
            hover:scale-110
        "
                >
                    <FaChevronLeft />
                </button>
            )}

            {/* Logo */}

            <div className="border-b border-white/10 p-6">

                <div className="flex items-center gap-3">

                    <div
                        className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center

                            rounded-2xl

                            bg-cyan-500/20
                            text-cyan-400

                            shadow-[0_0_25px_rgba(34,211,238,0.3)]
                        "
                    >
                        <FaWallet size={20} />
                    </div>

                    <div>

                        <h1 className="text-lg font-bold text-white">
                            ExpenseTracker
                        </h1>

                        <p className="text-xs text-slate-500">
                            Finance Dashboard
                        </p>

                    </div>

                </div>

            </div>

            {/* Navigation */}

            <nav className="space-y-2 p-4">

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex items-center gap-4 rounded-2xl px-4 py-4 transition ${isActive
                            ? "bg-cyan-500/15 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`
                    }
                >
                    <FaChartPie />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/transactions"
                    className={({ isActive }) =>
                        `flex items-center gap-4 rounded-2xl px-4 py-4 transition ${isActive
                            ? "bg-cyan-500/15 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`
                    }
                >
                    <FaMoneyBillWave />
                    Transactions
                </NavLink>

            </nav>

        </aside>
    );
}