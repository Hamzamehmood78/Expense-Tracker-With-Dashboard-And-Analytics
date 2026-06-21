export default function SummaryCard({
    title,
    value,
    icon,
    glowColor = "cyan"
}) {
    const glowStyles = {
        cyan: "shadow-[0_0_25px_rgba(34,211,238,0.15)]",
        green: "shadow-[0_0_25px_rgba(34,197,94,0.15)]",
        red: "shadow-[0_0_25px_rgba(239,68,68,0.15)]",
    };

    return (
        <div
            className={`
                rounded-3xl
                border border-white/10
                bg-white/5
                p-6
                backdrop-blur-xl
                ${glowStyles[glowColor]}
            `}
        >
            <div className="flex items-center justify-between">

                <div>
                    <p className="text-sm text-slate-400">
                        {title}
                    </p>

                    <h3 className="mt-3 text-4xl font-bold text-white">
                        ₹{value}
                    </h3>
                </div>

                <div className="text-cyan-400">
                    {icon}
                </div>

            </div>
        </div>
    );
}