import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-white/10 bg-black/20 px-8 backdrop-blur-xl">

            <div>

                <h2 className="text-2xl font-bold text-white">
                    Dashboard
                </h2>

                <p className="text-sm text-slate-400">
                    Track your finances in real time
                </p>

            </div>

            <div className="flex items-center gap-5">

                <div className="text-right">

                    <p className="font-semibold text-white">
                        {user?.username}
                    </p>

                    <p className="text-sm text-slate-500">
                        {user?.email}
                    </p>

                </div>

                <button
                    onClick={logout}
                    className="rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-2 text-red-400 transition hover:bg-red-500/20"
                >
                    Logout
                </button>

            </div>

        </header>
    );
}