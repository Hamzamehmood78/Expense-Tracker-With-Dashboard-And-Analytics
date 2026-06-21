import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-[#030712]">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* OPEN BUTTON */}

            {!sidebarOpen && (
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="
                        fixed
                        left-4
                        top-6
                        z-[60]

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
                    <FaChevronRight />
                </button>
            )}

            {/* CONTENT */}

            <div
                className={`
                    transition-all duration-300
                    ${sidebarOpen ? "ml-72" : "ml-0"}
                `}
            >

                <Navbar />

                <main className="mx-auto max-w-7xl p-6">
                    {children}
                </main>

            </div>

        </div>
    );
}