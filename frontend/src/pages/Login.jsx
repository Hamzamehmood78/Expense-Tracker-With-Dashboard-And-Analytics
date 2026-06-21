import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    
const [formData, setFormData] = useState({
    email: "",
    password: "",
});

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleChange = (e) => {
    setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
    }));
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);
        setError("");

        await login(formData);

        navigate("/");
    } catch (error) {
        setError(
            error?.response?.data?.message ||
            "Login failed"
        );
    } finally {
        setLoading(false);
    }
};

return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-white">

        {/* Glow Effects */}

        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-[140px]" />

        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-violet-500/20 blur-[140px]" />

        {/* Main */}

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">

            <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl lg:grid-cols-2">

                {/* Left Side */}

                <div className="hidden lg:flex flex-col justify-center border-r border-white/10 p-12 xl:p-16">

                    <div className="mb-8 inline-flex w-fit rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                        Expense Tracker
                    </div>

                    <h1 className="max-w-sm text-5xl font-black leading-tight">
                        Track your money with confidence.
                    </h1>

                    <p className="mt-6 max-w-sm text-slate-400">
                        Manage expenses, monitor income and gain
                        financial insights through a modern dashboard.
                    </p>

                </div>

                {/* Right Side */}

                <div className="p-8 sm:p-12">

                    <div className="mb-8">
                        <h2 className="text-4xl font-bold">
                            Welcome Back
                        </h2>

                        <p className="mt-2 text-slate-400">
                            Sign in to access your dashboard.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>
                            <label className="mb-2 block text-sm text-slate-400">
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="john@example.com"
                                className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-5 outline-none transition focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-slate-400">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-5 outline-none transition focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="h-14 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold shadow-[0_0_30px_rgba(34,211,238,0.35)] transition hover:scale-[1.01]"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>

                    </form>

                    <p className="mt-8 text-center text-slate-400">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-semibold text-cyan-400 hover:text-cyan-300"
                        >
                            Create Account
                        </Link>
                    </p>

                </div>

            </div>

        </div>

    </div>
);

}
