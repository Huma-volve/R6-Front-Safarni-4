import { Home, Utensils, Landmark, Bed } from "lucide-react";
import type { Map } from "../../Types/Map";

function cx(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}


export default function TabsBar({
    tab,
    setTab,
}: {
    tab: Map.Tab;
    setTab: (t: Map.Tab) => void;
}) {
    const buttons = [
        { t: "main", n: "Set home", I: Home },
        { t: "restaurants", n: "Restaurants", I: Utensils },
        { t: "tourist", n: "Tourist Places", I: Landmark },
        { t: "hotels", n: "Hotel", I: Bed },
    ];

    return (
        <div className="pointer-events-auto flex justify-center gap-[18px] flex-wrap">
            {buttons.map(({ t, n, I }) => (
                <button
                    key={t}
                    onClick={() => setTab(t as Map.Tab)}
                    className={cx(
                        "inline-flex items-center gap-2 py-2.5 px-4 rounded-full border font-medium transition shadow-[0_8px_24px_rgba(15,23,42,0.06)]",
                        tab === t
                            ? "bg-indigo-50 border-indigo-300 text-indigo-600"
                            : "bg-white border-indigo-50 text-slate-900"
                    )}
                >
                    <I
                        className={cx(
                            "w-[18px] h-[18px]",
                            tab === t ? "text-indigo-600" : "text-slate-900"
                        )}
                    />
                    <span>{n}</span>
                </button>
            ))}
        </div>
    );
}
